define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            el: 'header',
            render: function(category, entity, nickname){
                $('header', this.el).html('');
                var assets = {};
                assets['entity'] = entity;
                assets['category'] = category;
                if (entity == "member"){
                    assets['person'] = {};
                    assets.person['nickname'] = nickname;
                } else if (entity == "author"){
                    assets['current_user'] = {};
                    assets.current_user['nickname'] = nickname;
                }
                $(this.el).html(window.env.render("header.html",
                    {'assets': assets }));
            }
        });
    }
);