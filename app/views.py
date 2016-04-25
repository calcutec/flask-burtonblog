from flask import render_template, flash, redirect, url_for, g, jsonify, request, make_response, abort
from flask.ext.login import login_user, logout_user, current_user, login_required
from flask.ext.sqlalchemy import get_debug_queries
from datetime import datetime
from app import app, db, lm
from config import DATABASE_QUERY_TIMEOUT
from .decorators import auth_required
from .forms import SignupForm, LoginForm, EditForm, PostForm
from .models import User, Post
from .utils import OAuthSignIn, PhotoPage, MembersPage, SignupPage, LoginPage
from flask.views import MethodView
import os
import json

basedir = os.path.abspath(os.path.dirname(__file__))


@app.route('/', methods=['GET'])
@app.route('/home/', methods=['GET'])
# @app.route('/photos/', methods=['GET'])
def home():
    if current_user.is_authenticated():
        return redirect(url_for('photos', category="latest"))
    else:
        return PhotoPage(title="home").render()


class SignupAPI(MethodView):
    def post(self):
        page = SignupPage(form=SignupForm(), category="signup")
        if page.assets['body_form']:
            return page.render()
        else:
            return redirect(url_for("members", nickname=current_user.nickname))
signup_api_view = SignupAPI.as_view('signup')  # URLS for MEMBER API
app.add_url_rule('/signup/', view_func=signup_api_view, methods=["GET", "POST"])  # Display and Validate Signup Form


class LoginAPI(MethodView):
    def post(self):
        page = LoginPage(form=LoginForm(), category="login")
        if page.assets['body_form']:
            return page.render()
        else:
            return redirect(url_for("members", nickname=current_user.nickname))

    def get(self, get_provider=None, provider=None):
        if get_provider is not None:    # GET OAUTH PROVIDER
            if not current_user.is_anonymous():
                return redirect(url_for('home'))
            oauth = OAuthSignIn.get_provider(get_provider)
            return oauth.authorize()
        elif provider is not None:  # OAUTH PROVIDER CALLBACK
            if not current_user.is_anonymous():
                return redirect(url_for('home'))
            oauth = OAuthSignIn.get_provider(provider)
            nickname, email = oauth.callback()
            if email is None:
                flash('Authentication failed.')
                return redirect("/photos/recent/")
            currentuser = User.query.filter_by(email=email).first()
            if not currentuser:
                currentuser = User(nickname=nickname, email=email, photo="profile.jpg")
                db.session.add(currentuser)
                db.session.commit()
            login_user(currentuser)
            return redirect(request.args.get('next') or '/photos/latest')
        else:   # LOGIN PAGE
            if g.user is not None and g.user.is_authenticated():
                return redirect(url_for('photos'))
            return LoginPage(category="login").render()
login_api_view = LoginAPI.as_view('login')  # Urls for Login API
# Authenticate user
app.add_url_rule('/login/', view_func=login_api_view, methods=["GET", "POST"])
# Oauth login
app.add_url_rule('/login/<get_provider>', view_func=login_api_view, methods=["GET", ])
# Oauth provider callback
app.add_url_rule('/callback/<provider>', view_func=login_api_view, methods=["GET", ])


@app.route('/logout', methods=['GET'])
def logout():
        logout_user()
        return redirect(url_for('login'))


class MembersAPI(MethodView):
    def post(self, category=None):
        page = MembersPage(form=EditForm(), category=category)
        if 'body_form' in page.assets and page.assets['body_form'] is not None:
            return page.render()
        else:
            return redirect(url_for("members", nickname=g.user.nickname))

    def get(self, nickname=None, category="latest"):
        if nickname is None:  # Display all members
            page = MembersPage(category=category).render()
            return page
        else:  # Display a single member
            if "key" in request.args:
                g.user.photo = request.args['key']
                db.session.add(g.user)
                db.session.commit()
                return redirect(url_for("members", nickname=nickname))
            elif category in ["follow", "unfollow"]:
                MembersPage(nickname=nickname, category=category)
                return redirect(redirect_url())
            else:
                return MembersPage(nickname=nickname, category=category).render()

    def put(self, member_id=None):
        user = User.query.get(member_id)

        # MembersPage(nickname=nickname, category="update")

    @login_required
    def delete(self, nickname):
        pass

members_api_view = MembersAPI.as_view('members')  # URLS for MEMBER API
app.add_url_rule('/members/',  # Read all members
                 view_func=members_api_view, methods=["GET"])
app.add_url_rule('/members/<int:member_id>',
                 view_func=members_api_view, methods=['PUT'])
app.add_url_rule("/members/<any('all', 'latest', 'follow', 'unfollow', 'update', 'upload'):category>/",
                 view_func=members_api_view, methods=["GET", "POST"])
app.add_url_rule('/members/<nickname>/',  # Read, Update and Destroy a single member
                 view_func=members_api_view, methods=["GET", "POST"])# Update or Delete a single post
app.add_url_rule('/members/<nickname>/<category>/',  # Get photos of a given category for a given member
                 view_func=members_api_view, methods=["GET"])


class PhotoAPI(MethodView):
    @login_required
    def post(self):
        page = PhotoPage(category="upload", form=PostForm())
        if page.assets['body_form']:
            return page.render()
        else:
            return redirect(url_for("photos", category="latest"))

    def get(self, post_id=None, category=None):
        if current_user.is_authenticated() or category != "upload":
            if post_id is None:
                page = PhotoPage(category=category).render()
                return page
            else:
                return PhotoPage(post_id=post_id, category=category).render()
        else:
            return LoginPage(title="login").render()

    # Update Post
    @login_required
    def put(self, post_id):
        form = PostForm()
        if form.validate_on_submit():
            update_post = Post.query.get(post_id)
            update_post.body = form.data['body']
            db.session.commit()
            response = update_post.json_view()
            response['updatedsuccess'] = True
            return json.dumps(response)
        else:
            result = {'updatedsuccess': False}
            return json.dumps(result)

    # Delete Post
    @login_required
    def delete(self, post_id):
        post = Post.query.get(post_id)
        db.session.delete(post)
        db.session.commit()
        result = {'deletedsuccess': True}
        return json.dumps(result)

photo_api_view = PhotoAPI.as_view('photos')
# Read all posts for a given page, Create a new post
app.add_url_rule('/photos/',
                 view_func=photo_api_view, methods=["GET", "POST"])
# Get photos of a given category
app.add_url_rule('/photos/<any("all", "latest", "popular", "starred", "upload", "home", "architecture", "event",'
                 '"family", "fantasy", "fashion", "landscape", "macro", "portrait", "street", "sport", "travel",'
                 '"wildlife"):category>/',
                 view_func=photo_api_view, methods=["GET", "POST"])
# Update or Delete a single post
app.add_url_rule('/photos/<int:post_id>/',
                 view_func=photo_api_view, methods=["GET", "PUT", "DELETE"])
# Vote on a single post
app.add_url_rule('/photos/<int:post_id>/<any("vote"):category>',
                 view_func=photo_api_view, methods=["GET", "POST"])


@app.context_processor
def inject_static_url():
    local_static_url = app.static_url_path
    static_url = 'https://s3.amazonaws.com/aperturus/'
    if os.environ.get('HEROKU') is not None:
        local_static_url = static_url
    if not static_url.endswith('/'):
        static_url += '/'
    if not local_static_url.endswith('/'):
        local_static_url += '/'
    return dict(
        static_url=static_url,
        local_static_url=local_static_url
    )


@lm.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.before_request
def before_request():
    g.user = current_user
    if g.user.is_authenticated():
        g.user.last_seen = datetime.utcnow()
        db.session.add(g.user)
        db.session.commit()


@app.after_request
def after_request(response):
    for query in get_debug_queries():
        if query.duration >= DATABASE_QUERY_TIMEOUT:
            app.logger.warning(
                "SLOW QUERY: %s\nParameters: %s\nDuration: %fs\nContext: %s\n" %
                (query.statement, query.parameters, query.duration,
                 query.context))
    return response


@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html', error=error), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html', error=error), 500


def redirect_url(default='photos'):
    return request.args.get('next') or \
           request.referrer or \
           url_for(default)


def make_public_picture(picture):
    new_picture = {}
    for field in picture:
        if field == 'id':
            new_picture['uri'] = url_for('picture_api', picture_id=picture['id'], _external=True)
        else:
            new_picture[field] = picture[field]
    return new_picture


pictures = [
    {
        'id': 1,
        'owner': u'Bill',
        'description': u'Taken in the city'
    },
    {
        'id': 2,
        'owner': u'Bill',
        'description': u'Taken in the country'
    }
]


class PictureAPI(MethodView):
    def get(self, picture_id):
        if picture_id is None:
            return jsonify({'pictures': [make_public_picture(picture) for picture in pictures]})
        else:
            picture = [picture for picture in pictures if picture['id'] == picture_id]
            if len(picture) == 0:
                abort(404)
            return jsonify({'picture': make_public_picture(picture[0])})

    @auth_required
    def post(self):
        if not request.json or 'owner' not in request.json:
            abort(400)
        picture = {
            'id': pictures[-1]['id'] + 1,
            'owner': request.json['owner'],
            'description': request.json.get('description', ""),
        }
        pictures.append(picture)
        return jsonify({'picture': picture}), 201

    @auth_required
    def delete(self, picture_id):
        picture = [picture for picture in pictures if picture['id'] == picture_id]
        if len(picture) == 0:
            abort(404)
        pictures.remove(picture[0])
        return jsonify({'result': True})

    @auth_required
    def put(self, picture_id):
        picture = [picture for picture in pictures if picture['id'] == picture_id]
        if len(picture) == 0:
            abort(404)
        if not request.json:
            abort(400)
        if 'owner' in request.json and type(request.json['owner']) != unicode:
            abort(400)
        if 'description' in request.json and type(request.json['description']) is not unicode:
            abort(400)

        picture[0]['owner'] = request.json.get('owner', picture[0]['owner'])
        picture[0]['description'] = request.json.get('description', picture[0]['description'])
        return jsonify({'picture': make_public_picture(picture[0])})

user_view = PictureAPI.as_view('picture_api')
app.add_url_rule('/pictures/', defaults={'picture_id': None}, view_func=user_view, methods=['GET'])
app.add_url_rule('/pictures/', view_func=user_view, methods=['POST'])
app.add_url_rule('/pictures/<int:picture_id>', view_func=user_view, methods=['GET', 'PUT', 'DELETE'])

# curl -i http://localhost:8000/pictures/
# curl -i http://localhost:8000/pictures/2
# curl -i -H "Content-Type: application/json" -X POST -d '{"owner":"John","description":"Taken at the seashore"}'
# http://localhost:8000/pictures/
# curl -i -H "Content-Type: application/json" -X PUT -d '{"description":"eating out"}' http://localhost:8000/pictures/2
# curl -i -H "Content-Type: application/json" -X DELETE http://localhost:8000/pictures/2
