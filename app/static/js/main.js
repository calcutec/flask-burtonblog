require.config({
    baseUrl: "/static/js/",
    paths: {
        jquery: 'libs/jquery/jquery.min',
        backbone: 'libs/backbone/backbone.min',
        nunjucks: 'libs/nunjucks/nunjucks-slim',
        underscore: 'libs/underscore/underscore-min',
        blueimp: 'libs/blueimp/blueimp-gallery',
        loadimage: 'libs/loadimage/load-image.js',
        app: 'app'
    },
    shim: {
        nunjucks: { exports : 'nunjucks'},
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        underscore: {
			'exports': '_'
		}
    }
});

define(['underscore', 'backbone', 'app'], function(_, Backbone, app){
    app.init()
});