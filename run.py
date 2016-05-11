#!flask/bin/python
from app import socketio, app

# app.run(debug=True, port=8000)
socketio.run(app, debug=True, port=8000)