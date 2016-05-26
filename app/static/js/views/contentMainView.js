define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            render: function() {
                var post = this.model.toJSON();
                post['author'] = { "nickname": post.nickname };
                var g = {};
                g.user = {};
                this.$el.html('');
                this.$el.html(window.env.render("main_entry.html", {'post': post, 'g': g, 'momentjs': moment }));
                return this;
            }
        });
    }
);