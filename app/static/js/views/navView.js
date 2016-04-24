define(['jquery', 'backbone', 'nunjucks'],
    function($, Backbone, nunjucks){
        return Backbone.View.extend({
            el: '#nav',
            render: function(category, entity){
                $('nav', this.el).html('');
                var assets = {};
                assets['entity'] = entity;
                assets['category'] = category;
                var request = {};
                request['endpoint'] = entity;
                $(this.el).html(window.env.render("nav_js.html",
                    {'assets': assets, 'request': request }));
            }
        });
    }
);