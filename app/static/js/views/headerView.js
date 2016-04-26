define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            el: 'header',
            render: function(itemDict){
                $('header', this.el).html('');
                var assets = {};
                assets['entity'] = itemDict.entity;
                assets['photo_id'] = itemDict.postId;
                assets['category'] = itemDict.category;
                if (itemDict.entity == "member"){
                    assets['person'] = {};
                    assets.person['nickname'] = itemDict.nickname;
                } else if (itemDict.entity == "author"){
                    var current_user = {};
                    current_user['nickname'] = itemDict.nickname;
                }
                $(this.el).html(window.env.render("header.html",
                    {'assets': assets, 'current_user': current_user }));
            }
        });
    }
);