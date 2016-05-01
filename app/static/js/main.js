require.config({

    baseUrl: "/static/js/",
    paths: {
        jquery: 'libs/jquery/jquery.min',
        backbone: 'libs/backbone/backbone.min',
        nunjucks: 'libs/nunjucks/nunjucks-slim',
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
    function (Router) {
        new Router();
    }
);