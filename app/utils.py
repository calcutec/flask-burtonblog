import boto
from PIL import Image
from app import app
from config import ALLOWED_EXTENSIONS
from forms import SignupForm, EditForm, PostForm, CommentForm, LoginForm
from rauth import OAuth2Service
import json
import urllib2
import cStringIO
from flask import request, redirect, url_for, render_template, g, flash, jsonify
from flask.views import View
from flask.ext.login import login_required
from models import User, Post
from functools import wraps
from datetime import timedelta
from datetime import datetime
import hmac
from base64 import b64encode
import hashlib


class BasePage(object):
    def __init__(self, title):
        self.title = title
        self.posts = self.get_posts()
        self.assets = dict()
        if not request.is_xhr:
            self.assets['title'] = self.title
        else:
            self.assets['title'] = jsonify(title=self.assets['title']).data

    def get_posts(self):
        posts = None
        if self.title == 'login':
            return posts
        elif self.title == 'home':
            posts = Post.query.filter_by(writing_type="op-ed").order_by(Post.timestamp.desc())
        elif self.title == 'photos':
            posts = Post.query.filter_by(writing_type="entry").order_by(Post.timestamp.desc())
        elif self.title == 'profile':
            posts = Post.query.filter_by(author=g.user).order_by(Post.timestamp.desc())
        elif self.title == 'people':
            posts = User.query.all()
        elif self.title == 'detail':
            posts = User.query.all()
        return posts

    def render(self):
        context = {'assets': self.assets}
        page = render_template("base.html", **context)
        return page

    def __str__(self):
        return "%s has %s posts" % (self.title, self.posts.count())


class PhotoPage(BasePage):
    def __init__(self, *args, **kwargs):
        super(PhotoPage, self).__init__(*args, **kwargs)
        if not request.is_xhr:
            self.get_non_xhr_assets()
        else:
            self.get_xhr_assets()

    def get_non_xhr_assets(self):
        if self.title == "photos":
            # self.assets['rendered_form'] = self.get_rendered_form()  # Currently not doing forms client-side
            self.assets['rendered_main_entry'] = render_template("main_entry.html", photo=self.posts[0].photo,
                                                                 id=self.posts[0].id)
            self.assets['rendered_archives'] = render_template("archives.html", posts=self.posts[1:6])
        elif self.title == "home":
            self.assets['rendered_main_entry'] = render_template("main_entry.html", photo=self.posts[0].photo,
                                                                 id=self.posts[0].id)
        elif self.title == "login":
            self.assets['rendered_body_form'] = self.get_rendered_form()
        elif self.title == "upload":
            self.assets['rendered_body_form'] = self.get_rendered_form()

    def get_xhr_assets(self):
        if self.title == "photos":
            self.assets['collection'] = [i.json_view() for i in self.posts[0:6]]
        elif self.title == "upload":
            self.assets['form'] = self.s3_upload_form(app.config['AWS_ACCESS_KEY_ID'],
                                                      app.config['AWS_SECRET_ACCESS_KEY'],
                                                      app.config['S3_REGION'], 'aperturus', prefix="user-images/")

    def get_rendered_form(self):
        if self.title == "upload":
            form = self.s3_upload_form(app.config['AWS_ACCESS_KEY_ID'],
                                                      app.config['AWS_SECRET_ACCESS_KEY'],
                                                      app.config['S3_REGION'], 'aperturus', prefix="user-images/")
            form_template = self.title + "_form.html"
            rendered_form = render_template(form_template, form=form)

        else:
            # form = self.get_form() # Not bothering with rendering wtform into template at this time
            form_template = self.title + "_form.html"
            rendered_form = render_template(form_template)
        return rendered_form

    def get_form(self):
        form = None
        if self.title == 'signup':
            form = SignupForm()
        elif self.title == 'login':
            form = LoginForm()
        elif self.title == 'profile':
            form = EditForm()
            form.nickname.data = g.user.nickname
            form.about_me.data = g.user.about_me
        elif self.title == 'upload':
            form = PostForm()
        elif self.title == 'detail':
            form = CommentForm()
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

    def s3_upload_form(self, access_key, secret_key, region, bucket, key=None, prefix=None):
        assert (key is not None) or (prefix is not None)
        if (key is not None) and (prefix is not None):
            assert key.startswith(prefix)
        now = datetime.utcnow()
        form = {
            'acl': 'private',
            'success_action_status': '200',
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

    def __str__(self):
        return "This is the %s page" % self.title


class MemberPage(BasePage):
    def __init__(self, *args, **kwargs):
        super(MemberPage, self).__init__(*args, **kwargs)
        if not request.is_xhr:
            self.get_non_xhr_assets()
        else:
            self.get_xhr_assets()

    def get_non_xhr_assets(self):
        if self.title == "people":
            # self.assets['rendered_form'] = self.get_rendered_form()  # Currently not doing forms client-side
            # self.assets['rendered_main_entry'] = render_template("main_entry.html", photo=self.posts[0].photo,
            #                                                      id=self.posts[0].id)
            self.assets['rendered_archives'] = render_template("members.html", posts=self.posts[0:12])

    def get_xhr_assets(self):
        if self.title == "members":
            self.assets['collection'] = [i.json_view() for i in self.posts[0:6]]

    def get_rendered_form(self):
        rendered_form = None
        if self.title == "members":
            # form = self.get_form() # Not bothering with rendering wtform into template at this time
            # rendered_form = render_template(form_template, form=form)
            form_template = self.title + "_form.html"
            rendered_form = render_template(form_template)
        return rendered_form

    def get_form(self):
        form = None
        if self.title == 'signup':
            form = SignupForm()
        elif self.title == 'profile':
            form = EditForm()
            form.nickname.data = g.user.nickname
            form.about_me.data = g.user.about_me
        return form

    def __str__(self):
        return "This is the %s page" % self.title


class ViewData(object):
    def __init__(self, page_mark, slug=None, nickname=None, page=1, form=None, render_form=None, posts_for_page=200):
        self.posts_for_page = posts_for_page
        self.slug = slug
        self.nickname = nickname
        self.page = page
        self.page_mark = page_mark
        self.template_name = "base_template.html"
        self.title = page_mark.title()
        self.page_logo = "img/icons/" + page_mark + ".svg"
        self.form = form
        self.render_form = render_form
        self.profile_user = None
        self.posts = None
        self.post = None
        self.assets = {}
        self.context = None

        self.get_items()
        self.get_context()

    def get_items(self):
        if self.page_mark == 'profile':
            self.profile_user = User.query.filter_by(nickname=self.nickname).first()
            self.posts = Post.query.filter_by(author=self.profile_user)\
                .order_by(Post.timestamp.desc()).paginate(self.page, self.posts_for_page, False)
            if not self.form:
                self.assets['header_form'] = self.get_form()

        elif self.page_mark == 'home':
            self.assets['header_text'] = "Home Page"

        elif self.page_mark == 'members':
            self.posts = User.query.all()
            self.assets['header_text'] = "Members on this site"

        elif self.page_mark == 'poetry':
            self.posts = Post.query.filter_by(writing_type="featured")\
                .order_by(Post.timestamp.desc()).paginate(self.page, self.posts_for_page, False)
            self.assets['header_text'] = "Poetry Page"

        elif self.page_mark == 'workshop':
            self.posts = Post.query.filter_by(writing_type="poem")\
                .order_by(Post.timestamp.desc()).paginate(self.page, self.posts_for_page, False)
            self.assets['header_text'] = "Workshop Page"

        elif self.page_mark == 'portfolio':
            self.posts = g.user.posts\
                .order_by(Post.timestamp.desc()).paginate(self.page, self.posts_for_page, False)
            if not self.form:
                self.assets['header_form'] = self.get_form()

        elif self.page_mark == 'detail':
            self.post = Post.query.filter(Post.slug == self.slug).first()
            self.assets['header_text'] = "Poem Details"
            if not self.form:
                self.assets['body_form'] = self.get_form()

        elif self.page_mark == 'signup':
            self.assets['header_text'] = "Signup Page"
            if not self.form:
                self.assets['body_form'] = self.get_form()

        elif self.page_mark == 'login':
            self.assets['header_text'] = "Login Page"
            if not self.form:
                self.assets['body_form'] = self.get_form()

    def get_form(self):
        rendered_form = None
        if self.page_mark == 'signup':
            self.form = SignupForm()
            rendered_form = render_template("assets/forms/signup_form.html", form=self.form)
        elif self.page_mark == 'login':
            self.form = LoginForm()
            rendered_form = render_template("assets/forms/login_form.html", form=self.form)
        elif self.page_mark == 'profile':
            self.form = EditForm()
            self.form.nickname.data = g.user.nickname
            self.form.about_me.data = g.user.about_me
            if self.render_form:  # Only render profile form on request, using button to show on noJS profile page
                rendered_form = render_template("assets/forms/profile_form.html", form=self.form)
        elif self.page_mark == 'portfolio':
            self.form = PostForm()
            if self.render_form:  # Only render post form on request, using button to show on noJS portfolio page
                rendered_form = render_template("assets/forms/poem_form.html", form=self.form)
        elif self.page_mark == 'detail':
            self.form = CommentForm()
            rendered_form = render_template("assets/forms/comment_form.html", form=self.form)
        return rendered_form

    def get_context(self):
        self.context = {'post': self.post, 'posts': self.posts, 'title': self.title, 'profile_user': self.profile_user,
                        'page_logo': self.page_logo, 'page_mark': self.page_mark, 'form': self.form,
                        'assets': self.assets}


def check_expired(func):
    @wraps(func)
    def decorated_function(page_mark=None, slug=None, post_id=None):
        if page_mark and page_mark not in ['poetry', 'portfolio', 'workshop', 'create']:
            flash("That page does not exist.")
            return redirect(url_for('home'))
        return func(page_mark, slug, post_id)

    return decorated_function


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


def pre_upload(img_obj):
    thumbnail_name, thumbnail_file, upload_directory = generate_thumbnail(**img_obj)
    s3_file_name = s3_upload(thumbnail_name, thumbnail_file, upload_directory)
    return s3_file_name


def s3_upload(filename, source_file, upload_directory, acl='public-read'):
    """ Uploads WTForm File Object to Amazon S3

        Expects following app.config attributes to be set:
            S3_KEY              :   S3 API Key
            S3_SECRET           :   S3 Secret Key
            S3_BUCKET           :   What bucket to upload to
            S3_UPLOAD_DIRECTORY :   Which S3 Directory.

        The default sets the access rights on the uploaded file to
        public-read.  Optionally, can generate a unique filename via
        the uuid4 function combined with the file extension from
        the source file(to avoid filename collision for user uploads.
    """

    # Connect to S3 and upload file.
    conn = boto.connect_s3(app.config["AWS_ACCESS_KEY_ID"], app.config["AWS_SECRET_ACCESS_KEY"])
    b = conn.get_bucket(app.config["S3_BUCKET"])

    sml = b.new_key("/".join([upload_directory, filename]))
    sml.set_contents_from_file(source_file, rewind=True)
    sml.set_acl(acl)

    return filename


def generate_thumbnail(filename, img, box, photo_type, crop, extension):
    """Downsample the image.
    @param box: tuple(x, y) - the bounding box of the result image
    """
    # preresize image with factor 2, 4, 8 and fast algorithm
    factor = 1
    while img.size[0]/factor > 2*box[0] and img.size[1]*2/factor > 2*box[1]:
        factor *= 2
    if factor > 1:
        img.thumbnail((img.size[0]/factor, img.size[1]/factor), Image.NEAREST)

    # calculate the cropping box and get the cropped part
    if crop:
        x1 = y1 = 0
        x2, y2 = img.size
        wratio = 1.0 * x2/box[0]
        hratio = 1.0 * y2/box[1]
        if hratio > wratio:
            y1 = int(y2/2-box[1]*wratio/2)
            y2 = int(y2/2+box[1]*wratio/2)
        else:
            x1 = int(x2/2-box[0]*hratio/2)
            x2 = int(x2/2+box[0]*hratio/2)
        img = img.crop((x1, y1, x2, y2))

    # Resize the image with best quality algorithm ANTI-ALIAS
    img.thumbnail(box, Image.ANTIALIAS)

    # save it into a file-like object
    thumbnail_name = photo_type + "_" + filename
    if photo_type == 'thumbnail':
        upload_directory = "cordova/www/pics"
    else:
        upload_directory = "user_imgs"
    image_stream = cStringIO.StringIO()
    img.save(image_stream, extension, quality=75)
    image_stream.seek(0)
    thumbnail_file = image_stream
    return thumbnail_name, thumbnail_file, upload_directory


class GenericListView(View):
    def __init__(self, view_data):
        self.view_data = view_data

    def get_template_name(self):
        return self.view_data.template_name

    def get_context(self):
        context = self.view_data.context
        return context

    def dispatch_request(self):
        context = self.get_context()
        return self.render_template(context)

    def render_template(self, context):
        return render_template(self.get_template_name(), **context)


class LoginRequiredListView(GenericListView):
    decorators = [login_required]


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
        return url_for('login', provider=self.provider_name,
                       _external=True)

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
