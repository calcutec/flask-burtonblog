#!flask/bin/python
from app import socketio, app
# from app import app


# app.run(debug=True, port=8000)
socketio.run(app, debug=True, port=8000)
# socketio.run(app, host='127.0.0.1', port=8000, resource="socket.io", policy_serve)