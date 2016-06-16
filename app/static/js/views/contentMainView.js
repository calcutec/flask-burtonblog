define(['jquery', 'backbone', 'ds', 'blueimp', 'views/appView', 'views/headerView', 'views/detailView'],
    function($, Backbone, DS, blueimp, AppView, HeaderView, DetailView){
        return Backbone.View.extend({
            events: {
                'click .gallery': 'gallery',
                'click .detail-link': 'detailLink'
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