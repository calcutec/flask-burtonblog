define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            render: function(itemDict){
                var assets = {};
                assets['category_counts'] = itemDict.counts;
                assets['category'] = itemDict.category;
                assets['photo_id'] = itemDict.postId;
                assets['entity'] = itemDict.entity;
                var current_user = {};
                current_user['nickname'] = itemDict.nickname;
                current_user['is_authenticated'] = function(){
                    return itemDict.authenticated;
                };
                $(this.el).html(window.env.render("nav.html", {'assets': assets, 'current_user': current_user }));
                return this;
            }
        });
    }
);