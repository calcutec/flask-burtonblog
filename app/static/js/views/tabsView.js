define(['jquery', 'backbone', 'views/commentsView', 'collections/commentCollection', 'models/commentModel'],
    function($, Backbone, CommentsView, CommentCollection, CommentModel){
        return Backbone.View.extend({
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
                this.$el.html(window.env.render("story_detail.html", {post: this.model.toJSON(), 'momentjs': moment,
                    exifFields: exifFields}));
            },

            unrender: function() {
                console.log('create unrender function')
            }
        });
    }
);