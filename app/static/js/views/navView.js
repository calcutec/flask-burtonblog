define(['jquery', 'backbone', 'nunjucks'],
    function($, Backbone, nunjucks){
        return Backbone.View.extend({
            el: '#nav',
            render: function(category, type){
                $('nav', this.el).html('');
                var assets = {};
                assets['entity'] = type;
                assets['category'] = category;
                var request = {};
                request['endpoint'] = type;
                $(this.el).html(nunjucks.render("nav_js.html",
                    {'assets': assets, 'request': request }));
            }
        });
    }
);