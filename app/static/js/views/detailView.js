define(['jquery', 'backbone', 'underscore', 'views/appView', 'views/commentsView', 'collections/commentCollection', 
    'models/commentModel'],
    function($, Backbone, _, AppView, CommentsView, CommentCollection, CommentModel){
        return Backbone.View.extend({
            events: {
                'click #deletephoto':   'deletephoto'
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

            renderComments: function() {
                var itemDict = {};
                itemDict.render = true;
                itemDict.entity = "comments";
                var comments = _.clone(this.model.get("comments"));
                var commentCollection = new CommentCollection
                comments.forEach(function(comment){
                    var commentModel = new CommentModel(comment);
                    commentCollection.add(commentModel);
                });
                var commentsView = new CommentsView({id: 'links', className: 'item-list', collection: commentCollection});
                AppView(commentsView, itemDict);
                var test = test;
            },

            render: function() {
                var post = this.model.toJSON();
                post['author'] = { "nickname": post.nickname };
                $(this.el).html(window.env.render("photo_detail.html", {'post': post, 'momentjs': moment }));
                this.renderComments();
                return this;
            }
        });
    }
);