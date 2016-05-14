({
    appDir: "../",
    baseUrl: "js/",
    dir: "../../dist/",
    // optimize: "none",

    paths: {
        jquery: 'libs/jquery/jquery.min',
        backbone: 'libs/backbone/backbone.min',
        nunjucks: 'libs/nunjucks/nunjucks-slim',
        underscore: 'libs/underscore/underscore-min',
        blueimp: 'libs/blueimp/blueimp-gallery',
        loadimage: 'libs/loadimage/load-image.js',
        socketio: 'libs/socket/socket.io.min',
        ds: 'libs/datastore/backbone-ds.min'
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
    },

    modules: [
        //Optimize the application files.
        {
            name: "main",
        }
    ]
})