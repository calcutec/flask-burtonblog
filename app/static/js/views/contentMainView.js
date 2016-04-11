define(['jquery', 'backbone'], 
    function($, Backbone){
        return Backbone.View.extend({ 
            events: {
                'click a.detail-link':   'detailLink'
            },
        
            detailLink: function(e) {
                e.preventDefault();
                console.log('detail link clicked');
            },
            dispose: function() {
                this.remove();
                this.off();
                this.model.off( null, null, this );
            },
            attachToView: function() {
                var id = this.$el.find('img').data().id;
                this.model = this.collection.get(id);
            },
        
            render: function() {
                var post = this.model.toJSON();
                this.$el.html(nunjucks.render("main_entry.html", {'post': post }));
                return this;
            }
        });
    }
);