define(['jquery', 'backbone', 'underscore', 'views/appView', 'views/commentsView', 'collections/commentCollection', 
    'models/commentModel'],
    function($, Backbone, _, AppView, CommentsView, CommentCollection, CommentModel){
        return Backbone.View.extend({
            events: {
                'click #deletephoto':   'deletephoto',
                'click .vote':   'vote',
                'click .unvote':   'vote'
            },

            initialize: function() {
                this.listenTo(this.model, 'change', this.render, this);
            },

            deletephoto: function() {
                var self = this;
                this.model.destroy({
                      success: function(){
                            self.remove();
                            $( ".fa-picture-o" ).trigger( "click" );
                      },
                      error: function(response){
                        console.log(response);
                      }
                });
            },

            vote: function(e) {
                e.preventDefault();
                if (this.model.get('has_voted') == true){
                    this.model.set({has_voted: false});
                } else {
                    this.model.set({has_voted: true});
                }

                var self = this;
                this.model.save(this.model.changedAttributes(), {
                    patch: true,
                    wait:true,
                    success: function() {
                        var changeddata = {'id': self.model.id, 'votes': self.model.get('votes')};
                        window.socket.emit('my broadcast event', {data: changeddata});
                        return false;

                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },

            renderComments: function() {
                var itemDict = {};
                itemDict.render = true;
                itemDict.entity = "comments";
                var comments = _.clone(this.model.get("comments"));
                var commentCollection = new CommentCollection;
                comments.forEach(function(comment){
                    var commentModel = new CommentModel(comment);
                    commentCollection.add(commentModel);
                });
                var commentsView = new CommentsView({id: 'links', className: 'item-list', collection: commentCollection});
                AppView(commentsView, itemDict);
            },

            render: function() {
                var post = this.model.toJSON();
                post['author'] = { "nickname": post.nickname };
                var votestatus = post.has_voted
                post['has_voted'] = function(){
                    return votestatus
                };
                $(this.el).html(window.env.render("photo_detail.html", {'post': post, 'momentjs': moment }));
                this.renderComments();
                return this;
            }
        });
    }
);