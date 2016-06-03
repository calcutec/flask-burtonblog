define(['jquery', 'backbone', 'ds', 'views/appView', 'views/headerView', 'views/navView', 'views/uploadFormView'],
    function($, Backbone, DS, AppView, HeaderView, NavView, UploadFormView){
        return Backbone.View.extend({

            initialize: function() {
                this.listenTo(this.model, 'change', this.render, this);
            },
            
            events: {
                'click .follow':   'followuser',
                'click .unfollow':   'unfollowuser',
                // 'click #update-info':   'updateInfo',
                'click #change-image': 'changeImage'
            },

            changeImage: function(e) {
                e.preventDefault();
                DS.set('collection', DS.getAll('photo'));
                DS.set('counts', this.$el.getCounts(DS.get('collection')));
                DS.set('entity', 'upload');
                DS.set('route', '/members/upload');
                Backbone.history.navigate(DS.get('route'), {trigger: false});
                AppView(new HeaderView({id: 'header'}));
                AppView(new NavView({id: 'navbar'}));
                AppView(new UploadFormView({id: 'main-view'}));
            },

            unfollowuser: function(e) {
                e.preventDefault();
                this.model.set({is_following: false});
                var self = this;
                this.model.save(this.model.changedAttributes(), {
                    patch: true,
                    wait:true,
                    success: function() {
                        var changeddata = {'id': self.model.id, 'followers': self.model.get('followers')};
                        window.socket.emit('my broadcast event', {data: changeddata});
                        return false;
                        
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },

            followuser: function(e) {
                e.preventDefault();
                this.model.set({is_following: true});
                var self = this;
                this.model.save(this.model.changedAttributes(), {
                    patch: true,
                    wait:true,
                    success: function() {
                        var changeddata = {'id': self.model.id, 'followers': self.model.get('followers')};
                        window.socket.emit('my broadcast event', {data: changeddata});
                        return false;
                        
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },
            
            detailLink: function(e) {
                e.preventDefault();
                console.log('detail link clicked');
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
            }
        });
    }
);