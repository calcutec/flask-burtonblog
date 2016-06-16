define(['jquery', 'backbone', 'blueimp'],
    function($, Backbone, blueimp){
        return Backbone.View.extend({
            tagName: "li",
            events: {
                'click .gallery':   'gallery'
            },
            render: function() {
                var post = this.model.toJSON();
                post['author'] = { "nickname": post.nickname };
                var assets = {};
                assets['entity'] = DS.get('entity');
                var self = this;
                post['comments'] = { "all": function(){
                    return self.models.get('comments')
                } };
                $(this.el).html(window.env.render("archive_entry.html", {'post': post, 'momentjs': moment, 'assets': assets}));
                return this;
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
                currentgallery.slide($(this.el).index()+1);
            }
        });
    }
);