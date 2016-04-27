require.config({

    baseUrl: "/static/js/",
    paths: {
        jquery: 'libs/jquery/jquery.min',
        backbone: 'libs/backbone/backbone.min',
        nunjucks: 'libs/nunjucks/nunjucks.min',
        underscore: 'libs/underscore/underscore.min',
        moment: 'libs/moment/moment'
        // templates: "static/templates" Use with templates.js file for prerendered templates
    },
    shim: {
        'nunjucks': { exports : 'nunjucks'},
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }

    }
});

define(['views/router'],
    function (Backbone, Router) {
        new Router();
    }
);