#!flask/bin/python
from app import socketio, app

socketio.run(app, debug=True, port=8000)