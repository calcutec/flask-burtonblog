require.config({
    baseUrl: "/static/js/",
    paths: {
        jquery: 'libs/jquery/jquery.min',
        backbone: 'libs/backbone/backbone.min',
        nunjucks: 'libs/nunjucks/nunjucks-slim',
        underscore: 'libs/underscore/underscore-min',
        blueimp: 'libs/blueimp/blueimp-gallery',
        loadimage: 'libs/loadimage/load-image',
        app: 'app'
    },
    shim: {
        nunjucks: { exports : 'nunjucks' },
        underscore: { exports: '_' },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
    }
});

define(['underscore', 'backbone', 'app'], function(_, Backbone, app){
    app.init()
});