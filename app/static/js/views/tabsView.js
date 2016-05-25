define(['jquery', 'backbone', 'views/commentsView', 'collections/commentCollection', 'models/commentModel'],
    function($, Backbone, CommentsView, CommentCollection, CommentModel){
        return Backbone.View.extend({
            render: function() {
                this.$el.html(window.env.render("story_detail.html", {post: this.model.toJSON(), 'momentjs': moment}));
                // this.renderComments();
            },

            unrender: function() {
                // this.commentsView.unrender();
                console.log('create unrender function')
            }
        });
    }
);