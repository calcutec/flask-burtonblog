require.config({

    baseUrl: "/static/js",

    paths: {
        jquery: 'libs/jquery/jquery.min',
        backbone: 'libs/backbone/backbone.min',
        nunjucks: 'libs/nunjucks/nunjucks.min',
        underscore: 'libs/underscore/underscore.min',
        // blueimp: 'libs/blueimp/blueimp-gallery.min',
        localstorage: 'libs/localstorage/localstorage.min'
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

require(['views/router'],
    function (Router) {
        new Router();
    }
);