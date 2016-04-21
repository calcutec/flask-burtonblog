from threading import Thread
from functools import wraps
from flask import g, make_response, jsonify


def async(f):
    def wrapper(*args, **kwargs):
        thr = Thread(target=f, args=args, kwargs=kwargs)
        thr.start()
    return wrapper


def auth_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not g.user.is_authenticated():
            return make_response(jsonify({'error': 'Unauthorized access'}), 403)
        return f(*args, **kwargs)
    return decorated_function
