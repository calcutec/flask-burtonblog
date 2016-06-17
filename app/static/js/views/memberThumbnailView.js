define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            tagName: "li",
            events: {
                'click .gallery':   'gallery',
                'click':    'showbuttons'
            },

            showbuttons: function(e) {
                e.preventDefault();
                this.$el.addClass('current');
                var allotherpics = $('li:not(.current)');
                allotherpics.removeClass("click");
                allotherpics.find('span.text-content').hide();
                this.$el.removeClass('current');
                this.$el.find('span.text-content').toggle();
                this.$el.toggleClass("click");
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