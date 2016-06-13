define(['jquery', 'backbone', 'ds'],
    function($, Backbone, DS){
        return Backbone.View.extend({

            events: {
                'click .follow':   'followstatus',
                'click .unfollow':   'followstatus',
            },

            followstatus: function(e) {
                e.preventDefault();
                if (this.model.get('is_following') == true){
                    this.model.set({is_following: false});
                } else {
                    this.model.set({is_following: true});
                }
                this.updateFollowing();
                var self = this;
                this.model.save(this.model.changedAttributes(), {
                    patch: true,
                    wait:true,
                    success: function() {
                        self.updateCount()
                        var changeddata = {'id': self.model.id, 'followers': self.model.get('followers')};
                        window.socket.emit('my broadcast event', {data: changeddata});
                        return false;

                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },

            render: function() {
                var post = this.model.toJSON();
                post['author'] = { "nickname": post.nickname };
                var currentfollowers = post.followers;
                var currentfollowed = post.followed;
                post['followers'] = { "count": function(){ return currentfollowers } };
                post['followed'] = { "count": function(){ return currentfollowed } };
                var g = {};
                g.user = {};
                g.user['is_following'] = function(){
                    return post.is_following;
                };
                this.$el.html('');
                this.$el.html(window.env.render("person.html", {'post': post, 'g': g, 'momentjs': moment }));

                return this;
            },

            updateFollowing: function() {
                var post = this.model.toJSON();
                post['author'] = { "nickname": post.nickname };
                var currentfollowers = post.followers;
                var currentfollowed = post.followed;
                post['followers'] = { "count": function(){ return currentfollowers } };
                post['followed'] = { "count": function(){ return currentfollowed } };
                var g = {};
                g.user = {};
                g.user['is_following'] = function(){
                    return post.is_following;
                };
                this.$el.find('#followers-icon').html(window.env.render("followers.html", {'post': post, 'g': g }));
            },

            updateCount: function() {
                this.$el.find( "#followers" ).html('Followers: ' + this.model.get('followers'));
            }
        });
    }
);