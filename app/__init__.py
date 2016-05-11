import os
from flask.ext.socketio import SocketIO
from .momentjs import momentjs
from flask import Flask
from jinja2 import FileSystemLoader
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager
from flask.ext.mail import Mail
from flask.ext.assets import Environment, Bundle
from config import ADMINS, MAIL_SERVER, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, SQLALCHEMY_DATABASE_URI
from flask_wtf.csrf import CsrfProtect

staticdirectory = "static"


class MyFlask(Flask):
    @property
    def static_folder(self):
        if self.config.get('STATIC_FOLDER') is not None:
            return os.path.join(self.root_path, self.config.get('STATIC_FOLDER'))

    @static_folder.setter
    def static_folder(self, value):
        self.config['STATIC_FOLDER'] = value

# Now these are equivalent:
app = Flask(__name__, static_folder=staticdirectory)
app.config['STATIC_FOLDER'] = staticdirectory

async_mode = 'eventlet'
print('async_mode is ' + async_mode)

# monkey patching is necessary because this application uses a background
# thread
if async_mode == 'eventlet':
    import eventlet
    eventlet.monkey_patch()
elif async_mode == 'gevent':
    from gevent import monkey
    monkey.patch_all()

socketio = SocketIO(app, async_mode=async_mode)

base_dir = os.path.dirname(os.path.realpath(__file__))
app.jinja_loader = FileSystemLoader(os.path.join(base_dir, staticdirectory, 'templates'))
app.jinja_env.globals['momentjs'] = momentjs
app.config.from_object('config')
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
assets = Environment(app)
db = SQLAlchemy(app)
lm = LoginManager()
lm.init_app(app)
lm.login_view = 'login'
lm.login_message = 'Please log in to access this page.'
mail = Mail(app)
CsrfProtect(app)

js_templates = Bundle('templates/archive_entry.js', 'templates/member.js', 'templates/header.js', 'templates/nav.js',
                      'templates/main_entry.js', 'templates/person.js', 'templates/photo_detail.js',
                      'templates/home_page.js', 'templates/comments.js', 'templates/comment.js',
                      output='templates/templates.js')
assets.register('js_templates', js_templates)


app.config['OAUTH_CREDENTIALS'] = {
    'facebook': {
        'id': os.environ['FACEBOOK_AUTH'],
        'secret': os.environ['FACEBOOK_AUTH_SECRET']
    },
    'google': {
        'id': os.environ['GOOGLE_AUTH'],
        'secret': os.environ['GOOGLE_AUTH_SECRET']
    }
    # 'twitter': {
    #     'id': os.environ['TWITTER_AUTH'],
    #     'secret': os.environ['TWITTER_AUTH_SECRET']
    # }
}

if not app.debug and MAIL_SERVER != '':
    import logging
    from logging.handlers import SMTPHandler
    credentials = None
    if MAIL_USERNAME or MAIL_PASSWORD:
        credentials = (MAIL_USERNAME, MAIL_PASSWORD)
    mail_handler = SMTPHandler((MAIL_SERVER, MAIL_PORT),
                               'no-reply@' + MAIL_SERVER, ADMINS,
                               'burtonblog failure', credentials)
    mail_handler.setLevel(logging.ERROR)
    app.logger.addHandler(mail_handler)

if not app.debug and os.environ.get('HEROKU') is None:
    import logging
    from logging.handlers import RotatingFileHandler
    file_handler = RotatingFileHandler('tmp/burtonblog.log', 'a',
                                       1 * 1024 * 1024, 10)
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('burtonblog startup')

if os.environ.get('HEROKU') is not None:
    import logging
    stream_handler = logging.StreamHandler()
    app.logger.addHandler(stream_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('burtonblog startup')

app.config["S3_LOCATION"] = 'https://s3.amazonaws.com/aperturus/'
app.config["S3_UPLOAD_DIRECTORY"] = 'user_imgs'
app.config["S3_BUCKET"] = 'aperturus'
app.config["S3_REGION"] = 'us-east-1'
app.config["AWS_ACCESS_KEY_ID"] = os.environ['AWS_ACCESS_KEY_ID']
app.config["AWS_SECRET_ACCESS_KEY"] = os.environ['AWS_SECRET_ACCESS_KEY']

from app import views, models
