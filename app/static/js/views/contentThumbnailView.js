define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            tagName: "li",
            events: {
                // 'click a.follow':   'follow',
                // 'click a.unfollow':   'unfollow',
                'click .gallery':   'gallery'
            },
            render: function() {
                var post = this.model.toJSON();
                post['author'] = { "nickname": post.nickname };
                var self = this;
                post['comments'] = { "all": function(){
                    return self.models.get('comments')
                } };
                $(this.el).html(window.env.render("archive_entry.html", {'post': post, 'momentjs': moment}));
                return this;
            },

            follow: function(e) {
                e.preventDefault();
                console.log('follow link clicked');
                this.model.set('followed', true);
                this.model.save(null, {
                    success: function (model, response) {
                        console.log(response);
                    },
                    error: function (model, response) {
                        console.log(response);
                    }
                });
            },

            unfollow: function(e) {
                e.preventDefault();
                console.log('unfollow link clicked');
                this.model.set('followed', false);
                this.model.save(null, {
                    success: function (model, response) {
                        console.log(response);
                    },
                    error: function (model, response) {
                        console.log(response);
                    }
                });
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