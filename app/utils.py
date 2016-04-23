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
        self.posts = None
        self.form = form
        self.nickname = nickname
        self.post_id = post_id
        self.assets = dict()
        self.assets['category'] = category
        if title:
            self.assets['title'] = title
        else:
            self.assets['title'] = request.endpoint

        if self.nickname is not None:
            self.assets['person'] = User.query.filter_by(nickname=self.nickname).first()

        self.get_entity()

        if self.assets['category'] in ["login", "upload", "update", "signup", "follow", "unfollow"]:
            self.get_rendered_form()
        else:
            self.get_posts()

    def get_entity(self):
        entity = None
        if request.endpoint == 'home':
            entity = 'editor'
        elif request.endpoint == 'photos':
            if self.post_id:
                entity = "photo"
            else:
                entity = "photos"
        elif request.endpoint == 'members' and 'person' in self.assets and self.assets['person'] == g.user:
            entity = "author"
        elif request.endpoint == 'members' and 'person' in self.assets and self.assets['person'] != g.user:
            entity = "member"
        elif request.endpoint == 'members':
            entity = "members"
        self.assets['entity'] = entity

    def get_rendered_form(self):
        processor_dict = {
            "upload": UploadFormProcessor,
            "signup": SignupFormProcessor,
            "photo":  PhotosFormProcessor,
            "update": UpdateFormProcessor,
            "login": LoginFormProcessor
        }
        self.assets['body_form'] = processor_dict[self.assets['category']](page=self).rendered_form

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

        posts_dict = posts_dict[self.assets['entity']]

        if posts_dict['obj'] == "user":
            posts = User.query.all()
        else:
            posts = Post.query.filter_by(**posts_dict['filter']).order_by(Post.timestamp.desc())
            # Get count of photos in each category owned by the above entities (author, member, photos, editor)
            category_counts = dict()
            for value in db.session.query(Post.category).filter_by(**posts_dict['filter']).distinct():
                category_counts[value[0]] = int(db.session.query(Post).filter_by(**posts_dict['filter'])
                                                .filter(Post.category == value[0]).count())
            self.assets['category_counts'] = category_counts

        if self.assets['category'] in ["all", "vote"] or self.assets['category'] is None:
            self.posts = posts
        elif self.assets['category'] == "latest":
            self.posts = posts[0:10]
        else:
            self.posts = posts.filter_by(category=self.assets['category'])

    def get_asset(self, template=None, context=None):
        if request.is_xhr:
            asset = jsonify(context)
        else:
            if template is None:
                asset = render_template(self.assets['title'] + ".html", **context)
            else:
                asset = render_template(template, **context)
        return asset

    def render(self):
        if request.is_xhr:
            response = dict()
            response['success'] = True
            if 'collection' in self.assets:
                response['collection'] = self.assets['collection']
            elif 'body_form' in self.assets:
                response['uploadForm'] = self.assets['body_form']
            return json.dumps(response)
        else:
            context = {'assets': self.assets}
            page = render_template("base.html", **context)
            return page

    def __str__(self):
        return "%s has %s posts" % (self.assets['title'], self.posts.count())


class PhotoPage(BasePage):
    def __init__(self, *args, **kwargs):
        super(PhotoPage, self).__init__(*args, **kwargs)
        if self.assets['category'] not in ["login", "upload", "update", "signup"]:
            self.get_page_assets()

    def get_page_assets(self):
        if self.assets['entity'] == "editor":
            if request.is_xhr:
                pass
            else:
                # home_context = {'post': self.posts[0]}
                home_context = {'hello': "hello world"}
                self.assets['main_entry'] = self.get_asset(template="home_page.html", context=home_context)
        elif self.assets['entity'] == "photo":
            main_photo_context = {'post': self.posts[0]}
            self.assets['photo_id'] = self.posts[0].id
            self.assets['main_entry'] = self.get_asset(template="photo_detail.html", context=main_photo_context)
            if self.assets['category'] == "vote":
                self.vote()
        elif self.assets['entity'] == "photos":
            if request.is_xhr:
                # self.assets['collection'] = self.get_asset(context=[i.json_view() for i in self.posts])
                self.assets['collection'] = [i.json_view() for i in self.posts]
            else:
                if type(self.posts) == list and len(self.posts) > 0:
                    self.render_sections()
                elif self.posts and self.posts.count() > 0:
                    self.render_sections()

    def render_sections(self):
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
        return "This is the %s page" % self.assets['title']


class MembersPage(BasePage):
    def __init__(self, *args, **kwargs):
        super(MembersPage, self).__init__(*args, **kwargs)
        if self.assets['category'] not in ["login", "upload", "update", "signup"]:
            self.get_page_assets()

    def get_page_assets(self):
        if self.assets['entity'] == "author" or self.assets['entity'] == "member":
            if request.is_xhr:
                pass
            else:
                user_context = {'post': self.assets['person']}
                self.assets['main_entry'] = self.get_asset(template='person.html', context=user_context)

                archive_photos_context = {'posts': self.posts}
                self.assets['archives'] = self.get_asset(template="archives.html", context=archive_photos_context)
            if self.assets['category'] == "follow":
                self.follow()
            if self.assets['category'] == "unfollow":
                self.unfollow()

        elif self.assets['entity'] == "members":
            if request.is_xhr:
                self.assets['collection'] = [i.json_view() for i in self.posts]
            else:
                members_context = {'posts': self.posts[1:], 'post': self.posts[0]}
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
        return "This is the %s page" % self.assets['title']


class MembersPageXHR(BasePage):
    def __init__(self, *args, **kwargs):
        super(MembersPageXHR, self).__init__(*args, **kwargs)
        self.update_member()

    def update_member(self):
            pass

    def __str__(self):
        return "This is the %s page" % self.assets['title']


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
        return "This is the %s page" % self.assets['title']


class LoginPage(BasePage):
    def __init__(self, *args, **kwargs):
        super(LoginPage, self).__init__(*args, **kwargs)

    def login_returning_user(self, form):
        returninguser = User.query.filter_by(email=form.email.data).first()
        login_user(returninguser)
        return returninguser

    def __str__(self):
        return "This is the %s page" % self.assets['title']


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
