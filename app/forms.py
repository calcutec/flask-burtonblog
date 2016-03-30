from app import app
from flask import request
from flask.ext.wtf import Form
from wtforms import StringField, BooleanField, TextAreaField, SubmitField, PasswordField, SelectField
from wtforms.validators import DataRequired, Email, Length
from .models import User
from datetime import datetime, timedelta
import hmac
from base64 import b64encode
import hashlib
import json


class LoginForm(Form):
    email = StringField("Email",  [DataRequired("Please enter your email address."),
                                   Email("Please enter your email address.")])
    password = PasswordField('Password', [DataRequired("Please enter a password.")])
    remember_me = BooleanField('remember_me', default=False)

    def __init__(self, *args, **kwargs):
        Form.__init__(self, *args, **kwargs)

    def validate(self):
        if not Form.validate(self):
            return False

        user = User.query.filter_by(email=self.email.data.lower()).first()
        if user and user.check_password(self.password.data):
            return True
        else:
            self.email.errors.append("Invalid e-mail or password")
            return False


class SignupForm(Form):
    firstname = StringField("First name",  [DataRequired("Please enter your first name.")])
    lastname = StringField("Last name",  [DataRequired("Please enter your last name.")])
    email = StringField("Email",  [DataRequired("Please enter your email address."),
                                   Email("Please enter your email address.")])
    password = PasswordField('Password', [DataRequired("Please enter a password.")])
    submit = SubmitField("Create account")
    remember_me = BooleanField('remember_me', default=False)

    def __init__(self, *args, **kwargs):
        Form.__init__(self, *args, **kwargs)

    def validate(self):
        if not Form.validate(self):
            return False

        user = User.query.filter_by(email=self.email.data.lower()).first()
        if user:
            self.email.errors.append("That email is already taken")
            return False
        else:
            return True


class EditForm(Form):
    nickname = StringField('nickname', validators=[DataRequired()])
    about_me = TextAreaField('about_me', validators=[Length(min=0, max=140)])
    photo = StringField('Photo')

    def __init__(self, *args, **kwargs):
        Form.__init__(self, *args, **kwargs)

    def validate(self, current_user=None):
        if not Form.validate(self):
            return False
        if self.nickname.data != User.make_valid_nickname(self.nickname.data):
            self.nickname.errors.append(
                'This nickname has invalid characters. '
                'Please use letters, numbers, dots and underscores only.')
            return False
        user = User.query.filter_by(nickname=self.nickname.data).first()
        if user is not None:
            if user.id is not current_user.id:
                self.nickname.errors.append(
                    'This nickname is already in use.')
                return False
        return True


class PostForm(Form):
    my_choices = [('entry', 'Entry'), ('op-ed', 'Op-ed'), ('featured', 'Featured')]
    body = TextAreaField('Post', validators=[DataRequired()])
    photo = StringField('Photo', validators=[DataRequired()])
    writing_type = SelectField('Type', choices=my_choices, default='entry')
    submit = SubmitField("Send")


class CommentForm(Form):
    comment = StringField('comment', validators=[DataRequired()])
    submit = SubmitField("Send")
    

class SearchForm(Form):
    search = StringField('search', validators=[DataRequired()])


class ContactForm(Form):
    name = StringField("Name")
    email = StringField("Email")
    subject = StringField("Subject")
    message = TextAreaField("Message")
    submit = SubmitField("Send")


class UploadForm(object):
    def __init__(self, key, message):
        self.access_key = app.config['AWS_ACCESS_KEY_ID']
        self.secret_key = app.config['AWS_SECRET_ACCESS_KEY']
        self.region = app.config['S3_REGION']
        self.bucket = 'aperturus'
        self.key = key
        self.message = message
        self.prefix = None
        self.target_url = request.base_url

    def s3_upload_form(self):
        assert (self.key is not None) or (self.prefix is not None)
        if (self.key is not None) and (self.prefix is not None):
            assert self.key.startswith(self.prefix)
        now = datetime.utcnow()
        form = {
            'acl': 'private',
            'success_action_status': '200',
            'success_action_redirect': self.target_url,
            'x-amz-algorithm': 'AWS4-HMAC-SHA256',
            'x-amz-credential': '{}/{}/{}/s3/aws4_request'.format(self.access_key, now.strftime('%Y%m%d'), self.region),
            'x-amz-date': now.strftime('%Y%m%dT000000Z'),
        }
        expiration = now + timedelta(minutes=30)
        policy = {
            'expiration': expiration.strftime('%Y-%m-%dT%H:%M:%SZ'),
            'conditions': [
                {'bucket': self.bucket},
                {'acl': 'private'},
                ['content-length-range', 32, 10485760],
                {'success_action_status': form['success_action_status']},
                {'success_action_redirect': form['success_action_redirect']},
                {'x-amz-algorithm': form['x-amz-algorithm']},
                {'x-amz-credential': form['x-amz-credential']},
                {'x-amz-date': form['x-amz-date']},
            ]
        }
        if self.region == 'us-east-1':
            form['action'] = 'https://{}.s3.amazonaws.com/'.format(self.bucket)
        else:
            form['action'] = 'https://{}.s3-{}.amazonaws.com/'.format(self.bucket, self.region)
        if self.key is not None:
            form['key'] = self.key
            policy['conditions'].append(
                {'key': self.key},
            )
        if self.prefix is not None:
            form['prefix'] = self.prefix
            policy['conditions'].append(
                ["starts-with", "$key", self.prefix],
            )
        form['policy'] = b64encode(json.dumps(policy))
        form['x-amz-signature'] = self.sign(self.secret_key, now, self.region, 's3', form['policy'])
        form['message'] = self.message
        return form

    def hmac_sha256(self, key, msg):
        return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()

    def sign(self, key, date, region, service, msg):
        date = date.strftime('%Y%m%d')
        hash1 = self.hmac_sha256('AWS4' + key, date)
        hash2 = self.hmac_sha256(hash1, region)
        hash3 = self.hmac_sha256(hash2, service)
        key = self.hmac_sha256(hash3, 'aws4_request')
        return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).hexdigest()
