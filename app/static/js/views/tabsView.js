define(['jquery', 'backbone', 'views/commentsView', 'collections/commentCollection', 'models/commentModel'],
    function($, Backbone, CommentsView, CommentCollection, CommentModel){
        return Backbone.View.extend({

            events: {
                'click #comment-form-submit': 'submitComment'
            },

            initialize: function() {
                this.listenTo(this.model, 'change', this.render, this);
            },

            submitComment: function(e) {
                e.preventDefault();
                var form = this.$el.find('form').serializeObject();

                var comment = {};
                comment.body =  form.comment;
                comment.user_id = window.env.globals.current_user.id;
                comment.post_id = this.model.id;
                var comments = this.model.get('comments');
                comments.push(comment);
                this.model.set({comments: comments});
                var self = this;
                this.model.save(this.model.changedAttributes(), {
                    patch: true,
                    wait:true,
                    success: function(model) {
                        var result = model;
                        // var changeddata = {'id': self.model.id, 'followers': self.model.get('followers')};
                        // window.socket.emit('my broadcast event', {data: changeddata});
                        // return false;
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },

            render: function() {
                var exifFields = {};
                var self = this;
                exifFields['iteritems'] = function(){
                    var unordered = self.model.get('exifData');
                    const ordered = {};
                    Object.keys(unordered).sort().forEach(function(key) {
                      ordered[key] = unordered[key];
                    });
                    return ordered;
                };
                var csrfToken = $('meta[name=csrf-token]').attr('content');
                this.$el.html(window.env.render("story_detail.html", {post: this.model.toJSON(), 'momentjs': moment,
                    exifFields: exifFields, csrf_token: csrfToken }));
            },

            unrender: function() {
                console.log('create unrender function')
            }
        });
    }
);