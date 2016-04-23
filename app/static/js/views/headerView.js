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
                $(this.el).html(nunjucks.render("header.html",
                    {'assets': assets, 'request': request }));
            }
        });
    }
);