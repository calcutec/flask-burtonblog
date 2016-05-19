define(['jquery', 'backbone', 'views/contentThumbnailView'],
    function($, Backbone, ContentThumbnailView){
        return Backbone.View.extend({
            initialize: function() {
              this.subViews = [];
            },
            
            attachToView: function() {
                var self = this;
                this.$el.children('li').each(function(){
                    var photoEl = $(this);
                    var id = photoEl.data().id;
                    var thumbnailView = new ContentThumbnailView({
                        model: self.collection.get(id),
                        el: photoEl
                    });
                    self.subViews.push(thumbnailView);
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
                var thumbnailView = new ContentThumbnailView({ model: model});
                this.subViews.push(thumbnailView);
                this.$el.append(thumbnailView.render().el);
            },
            
            unrender: function() {
                this.subViews.forEach(function(model){model.remove()})
            }
        });
    }
);