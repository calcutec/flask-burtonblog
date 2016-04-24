define(['jquery', 'backbone', 'nunjucks'],
    function($, Backbone, nunjucks){
        return Backbone.View.extend({
            el: 'header',
            render: function(category, type){
                $('header', this.el).html('');
                var assets = {};
                assets['entity'] = type;
                assets['category'] = category;
                var request = {};
                request['endpoint'] = type;
                nunjucks.configure("../static/templates");
                $(this.el).html(nunjucks.render("header.html",
                    {'assets': assets, 'request': request }));
            }
        });
    }
);