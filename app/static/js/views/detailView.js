define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            render: function() {
                var post = this.model.toJSON();
                post['author'] = { "nickname": post.nickname };
                $(this.el).html(window.env.render("photo_detail.html", {'post': post, 'momentjs': moment }));
                return this;
            }
        });
    }
);