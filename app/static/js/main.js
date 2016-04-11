require.config({

    baseUrl: "/static",

    paths: {
        jquery: 'js/libs/jquery/jquery.min',
        backbone: 'js/libs/backbone/backbone.min',
        nunjucks: 'js/libs/nunjucks/nunjucks.min',
        underscore: 'js/libs/underscore/underscore.min',
        blueimp: 'js/libs/blueimp/blueimp-gallery.min',
        localstorage: 'js/libs/localstorage/localstorage.min'
        // templates: "static/templates" Use with templates.js file for prerendered templates
    },
    shim: {
        'nunjucks': { exports : 'nunjucks'},
        // "templates" : { exports : "nunjucks.env", deps : [ "nunjucks" ] }, Use with templates.js file
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }
    }
});

require(['js/views/router'],
    function (Router) {
        new Router();
    }
);