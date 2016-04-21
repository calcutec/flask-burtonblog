define(['jquery', 'backbone', 'views/contentThumbnailView'],
    function($, Backbone, ContentThumbnailView){
        return Backbone.View.extend({ 
            attachToView: function() {
                var self = this;
                $(this.el).children('li').each(function(){
                    var photoEl = $(this);
                    var id = photoEl.data().id;
                    new ContentThumbnailView({
                        model: self.collection.get(id),
                        el: photoEl
                    });
                });
            },
            render: function() {
                this.collection.each(function(model) {
                    this.addOneToList(model);
                }, this);
                return this;
            },
            addOneToList: function (model) {
                var contentThumbnailView = new ContentThumbnailView({ model: model});
                $(this.el).append(contentThumbnailView.render().el);
            }
        });
    }
);