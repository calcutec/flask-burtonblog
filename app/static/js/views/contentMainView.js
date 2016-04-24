define(['jquery', 'backbone', 'nunjucks'],
    function($, Backbone, nunjucks){
        return Backbone.View.extend({
            events: {
                'click a.detail-link':   'detailLink'
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
                $('#main-image', this.el).html('');
                $('#home-page', this.el).remove();
                var post = this.collection[0].toJSON();
                post['author'] = { "nickname": post.nickname };
                $(this.el).html(window.env.render("main_entry.html", {'post': post, 'momentjs': moment }));
                return this;
            }
        });
    }
);