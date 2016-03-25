from app import app, db
from config import ALLOWED_EXTENSIONS
from forms import SignupForm, EditForm, PostForm, CommentForm, LoginForm
from rauth import OAuth2Service
import json
import urllib2
from flask import request, redirect, url_for, render_template, g, flash, jsonify, session
from flask.ext.login import login_required, current_user
from models import User, Post
from datetime import timedelta
from datetime import datetime
from uuid import uuid4
import hmac
from base64 import b64encode
import hashlib


class BasePage(object):
    def __init__(self, title, nickname=None, category=None, post_id=None, form=None):
        self.assets = dict()
        self.title = title
        self.form = form
        self.nickname = nickname
        self.category = category
        self.post_id = post_id
        if self.nickname is not None:
            self.assets['person'] = User.query.filter_by(nickname=self.nickname).first()
        self.posts = self.get_posts()
        self.get_title_asset()

        if self.form:
            self.assets['body_form'] = self.form
        else:
            if self.category == "upload":
                self.assets['body_form'] = Form("upload", target_url=request.base_url).form_asset
            elif self.title in ["login", "photo", "signup"]:
                self.assets['body_form'] = Form(self.title).form_asset
            elif self.title == "portfolio" and self.nickname is not None and self.nickname == g.user.nickname:
                self.assets['body_form'] = Form(self.title, nickname=self.nickname).form_asset
                self.assets['profile_photo_form'] = Form(self.title,
                                                         nickname=self.nickname,
                                                         target_url=request.base_url,
                                                         template="upload_form.html").form_asset

    def get_title_asset(self):
        if not request.is_xhr:
            self.assets['title'] = self.title
        else:
            self.assets['title'] = jsonify(title=self.assets['title']).data

    def get_posts(self):
        posts = None
        if self.title == 'login':
            return posts
        elif self.title == 'photos' and self.category != "upload":
            if self.post_id:
                posts = Post.query.filter_by(id=self.post_id)
            else:
                if not self.category:
                    posts = Post.query.filter_by(writing_type="entry").order_by(Post.timestamp.desc())
                elif self.category == 'home':
                    posts = Post.query.filter_by(writing_type="op-ed").order_by(Post.timestamp.desc())[0]
                elif self.category == 'recent':
                    posts = Post.query.filter_by(writing_type="entry").order_by(Post.timestamp.desc())[0:6]
        elif self.title == 'portfolio' and 'person' in self.assets and self.assets['person'] == g.user:
            posts = Post.query.filter_by(author=g.user).order_by(Post.timestamp.desc())
        elif self.title == 'portfolio' and 'person' in self.assets and self.assets['person'] != g.user:
            posts = Post.query.filter_by(author=self.assets['person']).order_by(Post.timestamp.desc())
        elif self.title == 'members':
            posts = User.query.all()
        return posts

    def get_asset(self, template=None, context=None):
        asset = None
        if request.is_xhr:
            asset = jsonify(context)
        else:
            if template is None:
                asset = render_template(self.title + ".html", **context)
            else:
                asset = render_template(template, **context)
        return asset

    def render(self):
        context = {'assets': self.assets}
        page = render_template("base.html", **context)
        return page

    def __str__(self):
        return "%s has %s posts" % (self.title, self.posts.count())


class PhotoPage(BasePage):
    def __init__(self, *args, **kwargs):
        super(PhotoPage, self).__init__(*args, **kwargs)
        self.get_page_assets()

    def get_page_assets(self):
        if self.title == "photos" and not self.category == "upload":
            if self.post_id:
                main_photo_context = {'photo': self.posts[0].photo, 'id': self.posts[0].id, 'body': self.posts[0].body}
                self.assets['main_entry'] = self.get_asset(template="main_entry.html", context=main_photo_context)
            else:
                if request.is_xhr:
                    self.assets['collection'] = self.get_asset(context=[i.json_view() for i in self.posts[0:6]])
                else:
                    main_photo_context = {'photo': self.posts[0].photo, 'id': self.posts[0].id}
                    archive_photos_context = {'posts': self.posts[1:]}
                    self.assets['main_entry'] = self.get_asset(template="main_entry.html", context=main_photo_context)
                    self.assets['archives'] = self.get_asset(template="archives.html", context=archive_photos_context)

    def __str__(self):
        return "This is the %s page" % self.title


class PeoplePage(BasePage):
    def __init__(self, *args, **kwargs):
        super(PeoplePage, self).__init__(*args, **kwargs)
        self.get_page_assets()

    def get_page_assets(self):
        if self.title == "portfolio" and "person" in self.assets:
            if request.is_xhr:
                pass
            else:
                self.assets['profile_page'] = True
                user_context = {'profile_user': self.assets['person'],
                                'profile_photo_form': self.assets['profile_photo_form']}
                self.assets['main_entry'] = self.get_asset(template='person.html', context=user_context)
                archive_photos_context = {'posts': self.posts[0:6]}
                self.assets['archives'] = self.get_asset(template="archives.html", context=archive_photos_context)
        elif self.title == "members":
            if request.is_xhr:
                self.assets['collection'] = [i.json_view() for i in self.posts[0:6]]
            else:
                self.assets['members_page'] = True
                members_context = {'posts': self.posts[0:12]}
                self.assets['archives'] = self.get_asset(template="members.html", context=members_context)

    def __str__(self):
        return "This is the %s page" % self.title


class Form(object):
    def __init__(self, title=None, template=None, nickname=None, key=None, target_url=None, form=None):
        self.nickname = nickname
        self.page_title = title
        self.key = key
        self.template = template

        self.target_url = target_url
        if not form:
            self.form = self.get_form()
            self.form_template = self.get_form_template()
            self.form_asset = self.prepare_form()
        else:
            self.form = form
            self.process_form()

    def process_form(self):
        processedform = None
        if self.page_title == 'photos':
            if self.form.validate_on_submit():
                photo_name = self.form.photo.data
                post = Post(body=self.form.body.data, timestamp=datetime.utcnow(),
                            author=g.user, photo=photo_name, writing_type="entry")
                db.session.add(post)
                db.session.commit()
                if request.is_xhr:
                    response = post.json_view()
                    response['savedsuccess'] = True
                    return json.dumps(response)
                else:
                    page = PhotoPage(title='photos').render()
                    return page
            else:
                if request.is_xhr:
                    self.form.errors['iserror'] = True
                    return json.dumps(self.form.errors)
                else:
                    context = {'assets': PhotoPage(title=request.endpoint, form=self.form).assets}
                    return render_template("base.html", **context)
        return processedform

    def get_form(self):
        form = None
        if self.page_title == 'photos':
            form = PostForm
        elif self.page_title == 'login':
            form = (LoginForm(), SignupForm)
        elif self.page_title == "portfolio" and self.nickname and self.nickname == g.user.nickname and self.target_url:
            key = "user-images/profile_image/" + str(uuid4()) + ".jpeg"
            form = self.s3_upload_form(app.config['AWS_ACCESS_KEY_ID'], app.config['AWS_SECRET_ACCESS_KEY'],
                           app.config['S3_REGION'], 'aperturus', key=key, target_url=self.target_url)
        elif self.page_title == "portfolio" and self.nickname and self.nickname == g.user.nickname:
            form = EditForm()
            form.nickname.data = g.user.nickname
            form.about_me.data = g.user.about_me
        elif self.page_title == 'upload':
            if 'key' in request.args:
                form = PostForm()
                form.photo.data = request.args['key']
                self.template = "post_form.html"
            else:
                key = "user-images/" + str(uuid4()) + ".jpeg"
                # form = self.s3_upload_form(app.config['AWS_ACCESS_KEY_ID'], app.config['AWS_SECRET_ACCESS_KEY'],
                #                            app.config['S3_REGION'], 'aperturus', prefix="user-images/")
                form = self.s3_upload_form(app.config['AWS_ACCESS_KEY_ID'], app.config['AWS_SECRET_ACCESS_KEY'],
                               app.config['S3_REGION'], 'aperturus', key=key, target_url=self.target_url)
        elif self.page_title == 'detail':
            form = CommentForm()
        return form

    def get_form_template(self):
        form_template = None
        if request.is_xhr:
            pass
        else:
            if self.template:
                form_template = "/assets/forms/" + self.template
            else:
                form_template = "/assets/forms/" + self.page_title + "_form.html"

        return form_template

    def prepare_form(self):
        form_asset = None
        if self.form:
            form_asset = render_template(self.form_template, form=self.form)
        else:
            form_asset = render_template(self.form_template)
        return form_asset

    def s3_upload_form(self, access_key, secret_key, region, bucket, key=None, prefix=None, target_url=None):
        assert (key is not None) or (prefix is not None)
        if (key is not None) and (prefix is not None):
            assert key.startswith(prefix)
        now = datetime.utcnow()
        form = {
            'acl': 'private',
            'success_action_status': '200',
            'success_action_redirect': target_url,
            'x-amz-algorithm': 'AWS4-HMAC-SHA256',
            'x-amz-credential': '{}/{}/{}/s3/aws4_request'.format(access_key, now.strftime('%Y%m%d'), region),
            'x-amz-date': now.strftime('%Y%m%dT000000Z'),
        }
        expiration = now + timedelta(minutes=30)
        policy = {
          'expiration': expiration.strftime('%Y-%m-%dT%H:%M:%SZ'),
          'conditions': [
            {'bucket': bucket},
            {'acl': 'private'},
            ['content-length-range', 32, 10485760],
            {'success_action_status': form['success_action_status']},
            {'success_action_redirect': form['success_action_redirect']},
            {'x-amz-algorithm':       form['x-amz-algorithm']},
            {'x-amz-credential':      form['x-amz-credential']},
            {'x-amz-date':            form['x-amz-date']},
          ]
        }
        if region == 'us-east-1':
            form['action'] = 'https://{}.s3.amazonaws.com/'.format(bucket)
        else:
            form['action'] = 'https://{}.s3-{}.amazonaws.com/'.format(bucket, region)
        if key is not None:
            form['key'] = key
            policy['conditions'].append(
              {'key':    key},
            )
        if prefix is not None:
            form['prefix'] = prefix
            policy['conditions'].append(
              ["starts-with", "$key", prefix],
            )
        form['policy'] = b64encode(json.dumps(policy))
        form['x-amz-signature'] = self.sign(secret_key, now, region, 's3', form['policy'])
        return form

    def hmac_sha256(self, key, msg):
        return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()

    def sign(self, key, date, region, service, msg):
        date = date.strftime('%Y%m%d')
        hash1 = self.hmac_sha256('AWS4'+key, date)
        hash2 = self.hmac_sha256(hash1, region)
        hash3 = self.hmac_sha256(hash2, service)
        key = self.hmac_sha256(hash3, 'aws4_request')
        return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).hexdigest()


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


class OAuthSignIn(object):
    providers = None

    def __init__(self, provider_name):
        self.provider_name = provider_name
        credentials = app.config['OAUTH_CREDENTIALS'][provider_name]
        self.consumer_id = credentials['id']
        self.consumer_secret = credentials['secret']

    def authorize(self):
        pass

    def callback(self):
        pass

    def get_callback_url(self):
        # next_url = request.args.get('next') or "/people"
        # return url_for('login', provider=self.provider_name, next=next_url, _external=True) Redirect to original page
        return url_for('login', provider=self.provider_name, _external=True)

    @classmethod
    def get_provider(cls, provider_name):
        if cls.providers is None:
            cls.providers = {}
            for provider_class in cls.__subclasses__():
                provider = provider_class()
                cls.providers[provider.provider_name] = provider
        return cls.providers[provider_name]


class FacebookSignIn(OAuthSignIn):
    def __init__(self):
        super(FacebookSignIn, self).__init__('facebook')
        self.service = OAuth2Service(
            name='facebook',
            client_id=self.consumer_id,
            client_secret=self.consumer_secret,
            authorize_url='https://graph.facebook.com/oauth/authorize',
            access_token_url='https://graph.facebook.com/oauth/access_token',
            base_url='https://graph.facebook.com/'
        )

    def authorize(self):
        return redirect(self.service.get_authorize_url(
            scope='email',
            response_type='code',
            redirect_uri=self.get_callback_url())
        )

    def callback(self):
        if 'code' not in request.args:
            return None, None, None
        oauth_session = self.service.get_auth_session(
            data={'code': request.args['code'],
                  'grant_type': 'authorization_code',
                  'redirect_uri': self.get_callback_url()}
        )
        me = oauth_session.get('me').json()
        nickname = me.get('email').split('@')[0]
        nickname = User.make_valid_nickname(nickname)
        nickname = User.make_unique_nickname(nickname)
        return nickname, me.get('email')


class GoogleSignIn(OAuthSignIn):
    def __init__(self):
        super(GoogleSignIn, self).__init__('google')
        googleinfo = urllib2.urlopen('https://accounts.google.com/.well-known/openid-configuration')
        google_params = json.load(googleinfo)
        self.service = OAuth2Service(
            name='google',
            client_id=self.consumer_id,
            client_secret=self.consumer_secret,
            authorize_url=google_params.get('authorization_endpoint'),
            base_url=google_params.get('userinfo_endpoint'),
            access_token_url=google_params.get('token_endpoint')
        )

    def authorize(self):
        return redirect(self.service.get_authorize_url(
            scope='email',
            response_type='code',
            redirect_uri=self.get_callback_url())
            )

    def callback(self):
        if 'code' not in request.args:
            return None, None, None
        oauth_session = self.service.get_auth_session(
            data={'code': request.args['code'],
                  'grant_type': 'authorization_code',
                  'redirect_uri': self.get_callback_url()},
            decoder=json.loads
        )
        me = oauth_session.get('').json()
        nickname = me['name']
        nickname = User.make_valid_nickname(nickname)
        nickname = User.make_unique_nickname(nickname)
        return nickname, me['email']