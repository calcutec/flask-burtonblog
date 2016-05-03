define(['jquery', 'backbone', 'views/memberThumbnailView'],
    function($, Backbone, MemberThumbnailView){
        return Backbone.View.extend({
            initialize: function() {
              this.subViews = [];
            },
            
            attachToView: function() {
                var self = this;
                this.$el.children('li').each(function(){
                    var photoEl = $(this);
                    var id = photoEl.data().id;
                    var thumbnailView = new MemberThumbnailView({
                        model: self.collection.get(id),
                        el: photoEl
                    });
                    self.subViews.push(thumbnailView);
                });
                return this;
            },
            render: function(options) {
                this.collection.forEach(function(model) {
                    this.addOneToList(model, options);
                }, this);
                return this;
            },
            addOneToList: function (model, options) {
                var thumbnailView = new MemberThumbnailView({ model: model});
                this.subViews.push(thumbnailView);
                this.$el.append(thumbnailView.render(options).el);
            },
            
            unrender: function() {
                this.subViews.forEach(function(model){model.remove()})
            }
        });
    }
);