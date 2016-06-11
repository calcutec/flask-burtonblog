define(['jquery', 'backbone', 'ds', 'views/commentView'],
    function($, Backbone, DS, CommentView){
        return Backbone.View.extend({

            events: {
                'click #comment-form-submit': 'submitComment',
                'click #updatestory': 'updatestory'
            },

            updatestory: function(e) {
                this.model.set('body', window.micropost);
                var self = this;
                this.model.save(this.model.changedAttributes(), {
                    patch: true,
                    wait:true,
                    success: function(model) {
                        DS.set('initialchange', true);
                        $('#updatestory').toggleClass('hide');
                        $('#comment-form-prompt').toggleClass('hide');
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },

            submitComment: function(e) {
                e.preventDefault();
                var form = this.$el.find('form').serializeObject();
                if (form.comment == '') {
                    return false;
                }
                var comment = {};
                comment.comment =  form.comment;
                comment.user_id = window.env.globals.current_user.id;
                comment.post_id = this.model.id;
                comment.author = {
                    'nickname': window.env.globals.current_user.nickname,
                    'photo': window.env.globals.current_user.photo
                };
                var comments = _.clone(this.model.get('comments'));
                comments.push(comment);
                this.model.set('comments', comments);
                var self = this;
                this.model.save(comment, {
                    patch: true,
                    wait:true,
                    success: function(commentmodel) {
                        var commentView = new CommentView({model: commentmodel});
                        self.$el.find('form')[0].reset();
                        self.$el.find('#comments').after(commentView.render().el);
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
            }
        });
    }
);