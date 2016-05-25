require.config({
    baseUrl: "/static/js/",
    paths: {
        jquery: 'libs/jquery/jquery.min',
        backbone: 'libs/backbone/backbone.min',
        nunjucks: 'libs/nunjucks/nunjucks-slim',
        underscore: 'libs/underscore/underscore-min',
        blueimp: 'libs/blueimp/blueimp-gallery',
        socketio: 'libs/socket/socket.io.min',
        ds: 'libs/datastore/backbone-ds.min',
        app: 'app'
    },
    shim: {
        nunjucks: { exports : 'nunjucks' },
        underscore: { exports: '_' },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }
    }
});

define(['underscore', 'backbone', 'app'], function(_, Backbone, app){
    app.init()
});