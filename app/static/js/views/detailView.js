define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            attachToView: function() {
                var id = $(this.el).find('img').data().id;
                this.model = this.collection.get(id);
            },
            render: function(itemDict) {
                itemDict.post = itemDict.collection.get(itemDict.postId).toJSON();
                itemDict.post['author'] = { "nickname": itemDict.post.nickname };
                itemDict.current_user = {};
                itemDict.current_user['is_authenticated'] = function(){
                    return itemDict.authenticated;
                };
                $(this.el).html(window.env.render("photo_detail.html", {'post': itemDict.post, 
                    'current_user': itemDict.current_user, 'momentjs': moment }));
                return this;
            }
        });
    }
);