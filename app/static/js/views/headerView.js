define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            el: '#header',

            render: function(){
                var assets = {};
                assets['entity'] = DS.get('entity');
                assets['photo_id'] = DS.get('postId');
                assets['category'] = DS.get('category');
                if (assets['entity'] == "member"){
                    assets['person'] = {};
                    assets.person['nickname'] = DS.get('nickname');
                } else if (assets['entity'] == "author"){
                    var current_user = {};
                    current_user['nickname'] = DS.get('nickname');
                }
                $(this.el).html(window.env.render("header.html",
                    {'assets': assets, 'current_user': current_user }));
            }
        });
    }
);