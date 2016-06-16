define(['jquery', 'backbone', 'underscore', 'ds', 'views/contentMainView', 'views/profileMainView', 'views/archiveView',
    'views/navView', 'views/headerView', 'views/contentThumbnailView', 'views/detailView', 'views/appView',
    'views/homeView', 'views/uploadFormView', 'collections/memberCollection'],
    function($, Backbone, _, DS, ContentMainView, ProfileMainView, ArchiveView, NavView, HeaderView,
             ContentThumbnailView, DetailView, AppView, HomeView, UploadFormView, MemberCollection){
        return Backbone.View.extend({
            el: '#thisgreatpic',
            initialize: function(options){

                DS.defineResource({
                    name: 'member',
                    idAttribute: 'id',
                    collection: MemberCollection
                });

                var self = this;
                DS.findAll('member').done(function(memberCollection) {
                    var current_user = {};
                    window.env.addGlobal("current_user", current_user);
                    var authenticated;
                    var main_user = memberCollection.find({'main_user': true});
                    if (main_user === undefined) {
                        authenticated = false;
                    } else {
                        authenticated = true;
                        current_user['id'] = main_user.get('id');
                        current_user['nickname'] = main_user.get('nickname');
                        current_user['photo'] = main_user.get('photo');
                    }
                    current_user['is_authenticated'] = function(){
                        return authenticated;
                    };

                    self.$el.resetDataStore();
                    DS.set('entity', options.pageType);
                    DS.set('nickname', options.identifier);

                    if(DS.get('entity') == 'photo') {
                        var itemModel = DS.getAll('photo').get(options.identifier);
                        AppView(new DetailView({el: '#main-view', 'model': itemModel}));
                    } else if (DS.get('entity') == 'home') {
                        AppView(new NavView({el: '#navbar'}));
                        AppView(new HeaderView({el: '#header'}));
                        AppView(new HomeView({el: '#main-view'}));
                    } else if (DS.get('entity') == 'photos'){
                        AppView(new NavView({el: '#navbar'}));
                        AppView(new HeaderView({el: '#header'}));
                        AppView(new ContentMainView({el: '#main-view', 'collection': DS.getAll('photo')}));
                        AppView(new ArchiveView({el: '#links', 'collection': DS.getAll('photo')}));
                    } else if (DS.get('entity') == 'members'){
                        AppView(new NavView({el: '#navbar'}));
                        AppView(new HeaderView({el: '#header'}));
                        AppView(new ArchiveView({el: '#links', 'collection': memberCollection}));
                    }   else if (DS.get('entity') == 'member'){
                        var model = memberCollection.where({nickname: DS.get('nickname')})[0];
                        AppView(new NavView({el: '#navbar'}));
                        AppView(new HeaderView({el: '#header'}));
                        AppView(new ProfileMainView({el: '#main-view', model: model}));
                        AppView(new ArchiveView({el: '#links', 'collection': DS.getAll('photo')}));
                    }
                });

                socket.on('followup', function(msg) {
                    var member = DS.getAll('member').get(msg.data.id);
                    member.set({'followers': msg.data.followers});
                });

                socket.on('voteup', function(msg) {
                    var photo = DS.getAll('photo').get(msg.data.id);
                    photo.set({'votes': msg.data.votes});
                });
            },

            events: {
                'click a.member-link':      'memberLink',
                'click #change-image': 'changeImage'
            },

            changeImage: function(e) {
                e.preventDefault();
                DS.set('collection', DS.getAll('photo'));
                DS.set('counts', this.$el.getCounts(DS.get('collection')));
                DS.set('entity', 'upload');
                DS.set('route', '/members/upload');
                Backbone.history.navigate(DS.get('route'), {trigger: false});
                AppView(new HeaderView({id: 'header'}));
                AppView(new NavView({id: 'navbar'}));
                AppView(new UploadFormView({id: 'main-view'}));
            },

            memberLink: function(e){
                e.preventDefault();
                this.$el.resetDataStore();
                DS.set('entity', 'member');
                DS.set('nickname', e.target.href.split('/')[4]);
                DS.set('target_user', DS.getAll('member').where({nickname: DS.get('nickname')})[0]);
                DS.set('route', '/members/' + DS.get('nickname'));
                Backbone.history.navigate(DS.get('route'), {trigger: false});
                DS.set('collection', DS.getAll('photo').where({nickname: DS.get('nickname')}));
                DS.set('counts', this.$el.getCounts(DS.get('collection')));
                DS.set('render', true);
                AppView(new HeaderView({id: 'header'}));
                AppView(new NavView({id: 'navbar'}));
                AppView(new ProfileMainView({id: 'main-view', model: DS.get('target_user')}));
                AppView(new ArchiveView({id: 'links', tagName: 'ul', className: 'item-list',
                        'collection': DS.get('collection')}));
            }
        });
    }
);