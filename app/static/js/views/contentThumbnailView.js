define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            events: {
                // 'click a.link-button':   'memberLink',
                // 'click a.detail-link':   'detailLink',
                'click .gallery':   'gallery'
            },
        
            memberLink: function(e) {
                e.preventDefault();
                console.log('member link clicked');
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