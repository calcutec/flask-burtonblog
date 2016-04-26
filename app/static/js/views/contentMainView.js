define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            events: {
                'click a.detail-link':   'detailLink'
            },
        
            detailLink: function(e) {
                e.preventDefault();
                console.log('detail link clicked');
            },

            attachToView: function() {
                var id = $(this.el).find('img').data().id;
                this.model = this.collection.get(id);
            },
        
            render: function(itemDict) {
                $('#main-image', this.el).html('');
                $('#home-page', this.el).remove();
                if (itemDict.entity == "member" || itemDict.entity == "author"){
                    var post = itemDict.target_user[0].toJSON();
                } else {
                    var post = itemDict.collection[0].toJSON();
                }
                post['author'] = { "nickname": post.nickname };
                post['followers'] = { "count": function(){ return 8 } };
                post['followed'] = { "count": function(){ return 8 } };
                var current_user = {};
                current_user['is_authenticated'] = function(){
                    return itemDict.authenticated;
                };
                current_user['is_following'] = function(){
                    return post.is_following;
                };
                $(this.el).html(window.env.render(itemDict.template, {'post': post, 'current_user': current_user,
                    'momentjs': moment }));
                return this;
            }
        });
    }
);