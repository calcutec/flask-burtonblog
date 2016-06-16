define(['jquery', 'underscore', 'backbone', 'ds', 'blueimp', 'views/appView', 'views/headerView', 'views/detailView'],
    function($, _, Backbone, DS, blueimp, AppView, HeaderView, DetailView){
        return Backbone.View.extend({
            tagName: "li",
            events: {
                'click .detail-link':      'detailLink',
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
            
            detailLink: function(e) {
                e.preventDefault();
                this.$el.resetDataStore();
                DS.set('collection', DS.getAll('photo'));
                DS.set('counts', this.$el.getCounts(DS.get('collection')));
                DS.set('entity', 'photo');
                DS.set('postId', e.target.closest('a').dataset.id);
                DS.set('route', '/photos/' + DS.get('postId'));
                DS.set('usernickname', window.env.globals.current_user.usernickname);
                Backbone.history.navigate(DS.get('route'), {trigger: false});
                DS.set('render', true);
                AppView(new HeaderView({id: 'header'}));
                var NavView = require("views/navView");
                AppView(new NavView({id: 'navbar'}));
                var itemModel = DS.get('collection').get(DS.get('postId'));
                itemModel.attributes.comments = _.sortBy(itemModel.get('comments'), 'created_at').reverse();
                AppView(new DetailView({id: 'main-view', model: itemModel}));
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