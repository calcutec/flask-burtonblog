define(['jquery', 'backbone', 'nunjucks'],
    function($, Backbone, nunjucks){
        return Backbone.View.extend({
            events: {
                // 'click a.detail-link':   'detailLink'
            },
        
            detailLink: function(e) {
                e.preventDefault();
                console.log('detail link clicked');
            },

            attachToView: function() {
                var id = $(this.el).find('img').data().id;
                this.model = this.collection.get(id);
            },
        
            render: function() {
                var post = this.collection.models[0].toJSON();
                this.$el.html(nunjucks.render("main_entry.html", {'post': post }));
                return this;
            }
        });
    }
);