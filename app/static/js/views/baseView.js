define(['jquery', 'backbone', 'ds', 'views/contentMainView', 'views/profileMainView', 'views/archiveView',
    'views/membersView', 'views/navView', 'views/headerView', 'views/contentThumbnailView', 'views/memberThumbnailView',
    'views/detailView', 'views/appView', 'views/homeView', 'views/uploadFormView', 'models/s3FormModel',
    'collections/memberCollection'],
    function($, Backbone, DS, ContentMainView, ProfileMainView, ArchiveView, MembersView, NavView, HeaderView,
             ContentThumbnailView, MemberThumbnailView, DetailView, AppView, HomeView, UploadFormView, S3FormModel,
             MemberCollection){
        return Backbone.View.extend({
            el: '#thisgreatpic',
            initialize: function(options){

                DS.defineResource({
                    name: 'member',
                    idAttribute: 'id',
                    collection: MemberCollection
                });

                self = this;
                DS.findAll('member').done(function(memberCollection) {
                    var current_user = {};
                    window.env.addGlobal("current_user", current_user);
                    var authenticated;
                    var main_user = memberCollection.find({'main_user': true});
                    if (main_user === undefined) {
                        authenticated = false;
                    } else {
                        authenticated = true;
                        current_user['nickname'] = main_user.get('nickname');
                        current_user['id'] = main_user.get('id');
                    }
                    current_user['is_authenticated'] = function(){
                        return authenticated;
                    };

                    self.resetDataStore();
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
                    console.log('FollowUp' + ': ' + msg.data);
                    var member = DS.getAll('member').get(msg.data.id);
                    member.set({'followers': msg.data.followers});
                });

                socket.on('voteup', function(msg) {
                    console.log('VoteUp' + ': ' + msg.data);
                    var photo = DS.getAll('photo').get(msg.data.id);
                    photo.set({'votes': msg.data.votes});
                });
            },

            events: {
                'click a.member-link':      'memberLink',
                'click a.detail-link':      'detailLink',
                'change #element':          'filterOnSelect',
                'click i.fa-picture-o':     'iconLink',
                'click i.fa-users':         'iconLink',
                'click i.fa-briefcase':     'iconLink',
                'click i.fa-home':          'iconLink',
                'click i.fa-upload':        'iconLink'
            },

            resetDataStore: function(e) {
                DS.set({'route': null, 'collection': null, 'category': null, 'entity': null, 'nickname':
                    null, 'authenticated': window.env.globals.current_user.is_authenticated(), 'count': null,
                    'postId': null, 'template': null, 'render': null });
            },

            filterOnSelect: function(e) {
                e.preventDefault();
                this.resetDataStore();
                DS.set('category', $( '#element' ).val());
                DS.set('render', true);
                DS.set('usernickname', window.env.globals.current_user.nickname);
                var pathArray = window.location.pathname.split( '/' );
                if (pathArray[1] == 'photos'){
                    DS.set('entity', 'photos');
                    DS.set('route', '/photos/' + DS.get('category') + '/');
                    Backbone.history.navigate(DS.get('route'), {trigger: false});
                    this.filter('photo');
                } else if (pathArray[1] == 'members'){
                    if (pathArray[2].match('all|latest') || pathArray[2] == ''){
                        DS.set('entity', 'members');
                        DS.set('route', '/members/' + DS.get('category') + '/');
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        this.filter('member');
                    } else {
                        DS.set('entity', 'member');
                        DS.set('nickname', pathArray[2]);
                        DS.set('target_user', DS.getAll('member').where({nickname: DS.get('nickname')})[0]);
                        DS.set('route', '/members/' + DS.get('nickname') + '/' + DS.get('category') + '/');
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        this.filter('photo');
                    }
                }
            },

            getCounts: function(collection){
                var categoryarray = [];
                collection.forEach(function(model){
                    categoryarray.push(model.get('category'))
                });

                var counts = {};
                for(var i = 0; i < categoryarray.length; ++i) {
                    if(!counts[categoryarray[i]])
                        counts[categoryarray[i]] = 0;
                    ++counts[categoryarray[i]];
                }
                return counts;
            },

            iconLink: function(e) {
                e.preventDefault();
                    this.resetDataStore();
                    DS.set('category', 'latest');
                    DS.set('render', 'true');
                    DS.set('usernickname', window.env.globals.current_user.nickname);
                    DS.set('userid', window.env.globals.current_user.id);
                    if (e.currentTarget.classList[1] == 'fa-users'){
                        DS.set('entity', 'members');
                        DS.set('route', '/members/' + DS.get('category') + '/');
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        this.filter('member');
                    } else if (e.currentTarget.classList[1] == 'fa-picture-o'){
                        DS.set('collection', DS.getAll('photo'));
                        DS.set('entity', 'photos');
                        DS.set('route', '/photos/' + DS.get('category') + '/');
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        this.filter('photo');
                    } else if (e.currentTarget.classList[1] == 'fa-briefcase'){
                        DS.set('entity', 'author');
                        DS.set('nickname', window.env.globals.current_user.nickname);
                        DS.set('usernickname', window.env.globals.current_user.nickname);
                        DS.set('target_user', DS.getAll('member').where({nickname: DS.get('usernickname')})[0]);
                        DS.set('route', '/members/' + DS.get('usernickname') + '/');
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        this.filter('photo');
                    } else if (e.currentTarget.classList[1] == 'fa-home'){
                        DS.set('collection', DS.getAll('photo'));
                        DS.set('entity', 'home');
                        DS.set('route', '/home/');
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        AppView(new HeaderView({id: 'header'}));
                        AppView(new NavView({id: 'navbar'}));
                        AppView(new HomeView({id: 'main-view'}));
                    } else if (e.currentTarget.classList[1] == 'fa-upload'){
                        DS.set('collection', DS.getAll('photo'));
                        DS.set('entity', 'upload');
                        DS.set('route', '/photos/upload/');
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        AppView(new HeaderView({id: 'header'}));
                        AppView(new NavView({id: 'navbar'}));
                        AppView(new UploadFormView({id: 'main-view'}));
                    }
            },

            memberLink: function(e){
                e.preventDefault();
                this.resetDataStore();
                DS.set('entity', 'member');
                DS.set('nickname', e.target.href.split('/')[4]);
                DS.set('target_user', DS.getAll('member').where({nickname: DS.get('nickname')})[0]);
                DS.set('route', '/members/' + DS.get('nickname') + '/');
                Backbone.history.navigate(DS.get('route'), {trigger: false});
                DS.set('collection', DS.getAll('photo').where({nickname: DS.get('nickname')}));
                DS.set('counts', this.getCounts(DS.get('collection')));
                DS.set('render', true);
                this.render();
            },

            detailLink: function(e) {
                e.preventDefault();
                this.resetDataStore();
                DS.set('collection', DS.getAll('photo'));
                DS.set('counts', this.getCounts(DS.get('collection')));
                DS.set('entity', 'photo');
                DS.set('postId', e.target.closest('a').dataset.id);
                DS.set('route', '/photos/' + DS.get('postId') + '/');
                DS.set('usernickname', window.env.globals.current_user.usernickname);
                Backbone.history.navigate(DS.get('route'), {trigger: false});
                DS.set('render', true);
                AppView(new HeaderView({id: 'header'}));
                AppView(new NavView({id: 'navbar'}));
                var itemModel = DS.get('collection').get(DS.get('postId'));
                AppView(new DetailView({id: 'main-view', model: itemModel}));
            },

            filter: function(item){
                if (DS.get('category') == 'all' || DS.get('category') == 'latest'){
                    if (DS.get('nickname')){
                        DS.set('collection', DS.getAll(item).where({nickname: DS.get('nickname')}));
                        DS.set('counts', this.getCounts(DS.get('collection')));
                        if (DS.get('category') == 'all') {
                            DS.set('collection', DS.get('collection').splice(0,100));
                        } else if (DS.get('category') == 'latest'){
                            DS.set('collection', DS.get('collection').splice(0,10));
                        }
                    } else {
                        DS.set('counts', this.getCounts(DS.getAll(item)));
                        if (DS.get('category') == 'all') {
                            DS.set('collection', DS.getAll(item).first(100));
                        } else if (DS.get('category') == 'latest'){
                            DS.set('collection', DS.getAll(item).first(10));
                        }
                    }

                    this.render();
                } else {
                    if (DS.get('nickname') && DS.get('category')){
                        DS.set('counts', this.getCounts(DS.getAll(item).where({nickname: DS.get('nickname')})));
                        DS.set('collection', DS.getAll(item).where({nickname: DS.get('nickname'),
                            category: DS.get('category') }));

                    } else if (DS.get('category')){
                        DS.set('counts', this.getCounts(DS.getAll('photo')));
                        DS.set('collection', DS.getAll(item).where({category: DS.get('category')}));
                    } else if (DS.get('nickname')){
                        DS.set('collection', DS.getAll(item).where({nickname: DS.get('nickname')}));
                        DS.set('counts', this.getCounts(DS.getAll(item)));
                    }
                    this.render();
                }
            },

            render: function(){
                AppView(new HeaderView({id: 'header'}));
                AppView(new NavView({id: 'navbar'}));
                if (DS.get('entity') != 'members') {
                    var mainmodel;
                    if (DS.get('entity') == "member" || DS.get('entity') == "author"){
                        mainmodel = DS.get('target_user');
                        AppView(new ProfileMainView({id: 'main-view', model: mainmodel}));
                    } else if (DS.get('entity') == "photo") {
                        mainmodel = DS.get('collection')[0];
                        AppView(new ContentMainView({id: 'main-view', model: mainmodel}));
                    } else {
                        mainmodel = DS.get('collection')[0];
                        AppView(new ContentMainView({id: 'main-view', model: mainmodel}));
                    }

                }
                if (DS.get('entity') == 'photos'){
                    AppView(new ArchiveView({id: 'links', tagName: 'ul', className: 'item-list',
                        'collection': DS.get('collection').splice(1)}));
                } else if (DS.get('entity') == 'member' || DS.get('entity') == 'author') {
                    AppView(new ArchiveView({id: 'links', tagName: 'ul', className: 'item-list',
                        'collection': DS.get('collection')}));
                } else if (DS.get('entity') == 'members') {
                    AppView(new MembersView({id: 'links', tagName: 'ul', className: 'item-list',
                        'collection': DS.get('collection')}));
                }
            }
        });
    }
);