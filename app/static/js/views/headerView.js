define(['jquery', 'backbone', 'nunjucks'],
    function($, Backbone, nunjucks){
        return Backbone.View.extend({
            el: 'header',
            render: function(){
                var assets = {};
                assets['entity'] = "members";
                assets['category'] = "latest";
                var request = {};
                request['endpoint'] = "members";
                $(this.el).html(nunjucks.render("header.html",
                    {'assets': assets, 'request': request }));
            }
        });
    }
);