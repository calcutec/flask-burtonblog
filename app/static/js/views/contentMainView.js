define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            events: {
                'click .follow':   'follow',
                'click .unfollow':   'unfollow'
            },

            follow: function(e) {
                e.preventDefault();
                console.log('follow button clicked');
            },

            unfollow: function(e) {
                e.preventDefault();
                console.log('unfollow button clicked');

                $.ajax({
                    type: 'POST',
                    url: window.location + "Home/InsertRecord",
                    data: {user:"Bill"} ,  // use the same paramtre name as in Controller
                    success: function(data) {
                        console.log(data);
                    },
                    error: function(){
                        console.log("error");
                    }
                });
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
                var post;
                if (itemDict.entity == "member" || itemDict.entity == "author"){
                    post = itemDict.target_user[0].toJSON();
                } else {
                    post = itemDict.collection[0].toJSON();
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
                current_user['nickname'] = itemDict.usernickname;

                this.$el.html(window.env.render(itemDict.template, {'post': post, 'current_user': current_user,
                    'momentjs': moment }));

                return this;
            }
        });
    }
);