define(['jquery', 'backbone', 'views/commentView'],
    function($, Backbone, CommentView){
        return Backbone.View.extend({
            initialize: function() {
              this.subViews = [];
            },
            
            attachToView: function() {
                var self = this;
                this.$el.children('li').each(function(){
                    var photoEl = $(this);
                    var id = photoEl.data().id;
                    var messageView = new MessageView({
                        model: self.collection.get(id),
                        el: photoEl
                    });
                    self.subViews.push(messageView);
                });
                return this;
            },
            render: function() {
                this.collection.forEach(function(model) {
                    this.addOneToList(model);
                }, this);
                return this;
            },
            addOneToList: function (model) {
                var commentView = new CommentView({ model: model});
                this.subViews.push(commentView);
                this.$el.append(commentView.render().el);
            },
            unrender: function() {
                this.subViews.forEach(function(model){model.remove()})
            }
        });
    }
);