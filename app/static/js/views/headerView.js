define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            el: 'header',
            render: function(category, entity){
                $('header', this.el).html('');
                var assets = {};
                assets['entity'] = entity;
                assets['category'] = category;
                if (entity == "member"){
                    assets['person'] = {};
                    assets.person['nickname'] = category;
                } else if (entity == "author"){
                    assets['current_user'] = {};
                    assets.current_user['nickname'] = category;
                }
                $(this.el).html(window.env.render("header.html",
                    {'assets': assets }));
            }
        });
    }
);