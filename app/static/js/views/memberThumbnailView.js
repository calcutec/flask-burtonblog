define(['jquery', 'backbone', 'moment'],
    function($, Backbone, moment){
        return Backbone.View.extend({
            tagName: "li",
            events: {
                'click .gallery':   'gallery'
            },
            render: function(options) {
                var post = this.model.toJSON();
                post['author'] = { "nickname": post.nickname };
                var assets = {};
                assets['entity'] = options['entity'];
                var self = this;
                post['comments'] = { "all": function(){
                    return self.models.get('comments')
                } };
                $(this.el).html(window.env.render("member.html", {'post': post, 'momentjs': moment, 'assets': assets}));
                return this;
            },
            
            gallery: function(event) {
                event.preventDefault();
                var target = event.target || event.srcElement,
                    link = target.src ? target.parentNode : target,
                    options = {index: link, event: event},
                    links = window.document.getElementsByClassName('gallery-image');
                var currentgallery = window.blueimp.Gallery(links, options);
                currentgallery.slide($(this.el).index());
            }
        });
    }
);