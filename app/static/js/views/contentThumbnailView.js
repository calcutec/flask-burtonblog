define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            events: {
                'click a.member-link':   'memberLink',
                'click a.detail-link':   'detailLink',
                'click a.follow':   'follow',
                'click a.unfollow':   'unfollow',
                'click .gallery':   'gallery'
            },
        
            memberLink: function(e) {
                e.preventDefault();
                console.log('member link clicked');
            },

            follow: function(e) {
                e.preventDefault();
                console.log('follow link clicked');
            },

            unfollow: function(e) {
                e.preventDefault();
                console.log('unfollow link clicked');
            },
        
            detailLink: function(e) {
                e.preventDefault();
                console.log('detail link clicked');
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