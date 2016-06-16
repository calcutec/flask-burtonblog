define(['jquery', 'backbone', 'blueimp'],
    function($, Backbone, blueimp){
        return Backbone.View.extend({
            events: {
                'click .gallery':   'gallery'
            },

            gallery: function(event) {
                event.preventDefault();
                var target = event.target || event.srcElement,
                    link = target.src ? target.parentNode : target,
                    options = {
                        index: link,
                        event: event,
                        speed: 400,
                        stretchImages: true,
                        toggleControlsOnSlideClick: false,
                        closeOnSlideClick: false,
                        displayTransition: false,
                        closeOnSwipeUpOrDown: false,
                        continuous: false

                    },
                    links = window.document.getElementsByClassName('gallery-image');
                var currentgallery = blueimp(links, options);
            },

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