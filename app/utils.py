from app import app, db
from flask.ext.login import current_user
from config import ALLOWED_EXTENSIONS
from rauth import OAuth2Service
import json
import urllib2
from flask import request, redirect, url_for, render_template, g, jsonify, abort, flash
from flask.ext.login import login_user
from models import User, Post
from .emails import follower_notification
from .form_processor import UploadFormProcessor, LoginFormProcessor, PhotosFormProcessor,\
    SignupFormProcessor, UpdateFormProcessor


class BasePage(object):
    def __init__(self, title=None, nickname=None, category="latest", post_id=None, form=None):
        self.assets = dict()
        self.entity = None
        self.posts = None
        self.nickname = nickname
        self.category = category
        self.form = form
        self.post_id = post_id
        if title:
            self.title = title
        else:
            self.title = request.endpoint

        if self.nickname is not None:
            self.assets['person'] = User.query.filter_by(nickname=self.nickname).first()
        self.get_entity()
        self.get_rendered_header()

        if self.category in ["login", "upload", "update", "signup"]:
            self.get_rendered_form()
        else:
            self.get_posts()

    def get_entity(self):
        if request.endpoint == 'home':
            self.entity = 'editor'
        elif request.endpoint == 'photos':
            if self.post_id:
                self.entity = "photo"
            else:
                self.entity = "photos"
        elif request.endpoint == 'members' and 'person' in self.assets and self.assets['person'] == g.user:
            self.entity = "author"
        elif request.endpoint == 'members' and 'person' in self.assets and self.assets['person'] != g.user:
            self.entity = "member"
        elif request.endpoint == 'members':
            self.entity = "members"

    def get_rendered_form(self):
        processor_dict = {
            "upload": UploadFormProcessor,
            "signup": SignupFormProcessor,
            "photo":  PhotosFormProcessor,
            "update": UpdateFormProcessor,
            "login": LoginFormProcessor
        }
        self.assets['body_form'] = processor_dict[self.category](page=self).rendered_form

    def get_rendered_header(self):
        if not request.is_xhr:
            self.assets['title'] = self.title
            self.assets['category'] = self.category
        else:
            self.assets['title'] = jsonify(title=self.assets['title']).data

    def get_posts(self):
        posts_dict = {
            "editor": {'obj': "post", 'filter': {'writing_type': 'op-ed'}},
            "photo": {'obj': "post", 'filter': {'id': self.post_id}},
            "photos": {'obj': "post", 'filter': {'writing_type': 'entry'}},
            "author": {'obj': "post", 'filter': {'author': current_user}},
            "members": {'obj': "user"}
        }

        if 'person' in self.assets:
            posts_dict['member'] = {'obj': "post", 'filter': {'author': self.assets['person']}}

        posts_dict = posts_dict[self.entity]

        if posts_dict['obj'] == "user":
            self.posts = User.query.all()
        else:
            self.posts = Post.query.filter_by(**posts_dict['filter']).order_by(Post.timestamp.desc())

    def get_asset(self, template=None, context=None):
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
        if self.entity == "editor":
            if request.is_xhr:
                pass
            else:
                home_context = {'post': self.posts[0]}
                self.assets['main_entry'] = self.get_asset(template="main_entry.html", context=home_context)
        elif self.entity == "photo":
            main_photo_context = {'post': self.posts[0]}
            self.assets['main_entry'] = self.get_asset(template="photo_detail.html", context=main_photo_context)
            if self.category == "vote":
                self.vote()
        elif self.entity == "photos":
            if request.is_xhr:
                self.assets['collection'] = self.get_asset(context=[i.json_view() for i in self.posts])
            else:
                main_photo_context = {'post': self.posts[0]}
                archive_photos_context = {'posts': self.posts[1:]}
                self.assets['main_entry'] = self.get_asset(template="main_entry.html", context=main_photo_context)
                self.assets['archives'] = self.get_asset(template="archives.html", context=archive_photos_context)

    def vote(self):
        post_id = self.post_id
        user_id = g.user.id
        if not post_id:
            abort(404)
        post = Post.query.get_or_404(int(post_id))
        post.vote(user_id=user_id)

    def __str__(self):
        return "This is the %s page" % self.title


class MembersPage(BasePage):
    def __init__(self, *args, **kwargs):
        super(MembersPage, self).__init__(*args, **kwargs)
        self.get_page_assets()

    def get_page_assets(self):
        if self.entity == "author" or self.entity == "member":
            if request.is_xhr:
                pass
            else:
                user_context = {'post': self.assets['person']}
                self.assets['main_entry'] = self.get_asset(template='person.html', context=user_context)

                archive_photos_context = {'posts': self.posts}
                self.assets['archives'] = self.get_asset(template="archives.html", context=archive_photos_context)
            if self.category == "follow":
                self.follow()
            if self.category == "unfollow":
                self.unfollow()

        elif self.entity == "members":
            if request.is_xhr:
                self.assets['collection'] = [i.json_view() for i in self.posts]
            else:
                members_context = {'posts': self.posts}
                self.assets['archives'] = self.get_asset(template="members.html", context=members_context)

    def follow(self):
        user = self.assets['person']
        if user is None:
            flash('User %s not found.' % self.nickname)
            return redirect(url_for('home'))
        if user == g.user:
            flash('You can\'t follow yourself!')
            return redirect(redirect_url())
        u = g.user.follow(user)
        if u is None:
            flash('Cannot follow %s.' % self.nickname)
            return redirect(redirect_url())
        db.session.add(u)
        db.session.commit()
        flash('You are now following %s.' % self.nickname)
        follower_notification(user, g.user)

    def unfollow(self):
        user = self.assets['person']
        if user is None:
            flash('User %s not found.' % self.nickname)
            return redirect(redirect_url())
        if user == g.user:
            flash('You can\'t unfollow yourself!')
            return redirect(redirect_url())
        u = g.user.unfollow(user)
        if u is None:
            flash('Cannot unfollow %s.' % self.nickname)
            return redirect(redirect_url())
        db.session.add(u)
        db.session.commit()
        flash('You have stopped following %s.' % self.nickname)

    def __str__(self):
        return "This is the %s page" % self.title


class SignupPage(BasePage):
    def __init__(self, *args, **kwargs):
        super(SignupPage, self).__init__(*args, **kwargs)
        self.get_page_assets()

    def get_page_assets(self):
        pass

    def save_user(self, form):
        newuser = User(form.firstname.data, form.email.data, firstname=form.firstname.data, lastname=form.lastname.data,
                       password=form.password.data, photo="profile.jpg")
        db.session.add(newuser)
        db.session.commit()
        login_user(newuser)
        return newuser

    def __str__(self):
        return "This is the %s page" % self.title


class LoginPage(BasePage):
    def __init__(self, *args, **kwargs):
        super(LoginPage, self).__init__(*args, **kwargs)

    def login_returning_user(self, form):
        returninguser = User.query.filter_by(email=form.email.data).first()
        login_user(returninguser)
        return returninguser

    def __str__(self):
        return "This is the %s page" % self.title


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


def redirect_url(default='home'):
    return request.args.get('next') or \
           request.referrer or \
           url_for(default)
