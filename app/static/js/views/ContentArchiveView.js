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
                var self = this;
                this.each( this.collection.models.slice(1,7), function(model) {
                    //console.log(model.get("id"));
                    self.addOneToList(model);
                }, this);
            },
            addOneToList: function (photo) {
                var contentThumbnailView = new ContentThumbnailView({ model: photo});
                $('ul#img-list', this.el).append(contentThumbnailView.render().el);
            }
        });
    }
);