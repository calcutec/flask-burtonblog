define(['jquery', 'backbone', 'ds', 'views/contentMainView', 'views/profileMainView', 'views/archiveView',
    'views/membersView', 'views/headerView', 'views/memberThumbnailView', 'views/appView', 'views/homeView',
    'views/uploadFormView'],
    function($, Backbone, DS, ContentMainView, ProfileMainView, ArchiveView, MembersView, HeaderView,
             MemberThumbnailView, AppView, HomeView, UploadFormView){
        return Backbone.View.extend({

            events: {
                'change #element':          'filterOnSelect',
                'click i.fa-picture-o':     'iconLink',
                'click i.fa-users':         'iconLink',
                'click i.fa-briefcase':     'iconLink',
                'click i.fa-home':          'iconLink',
                'click i.fa-upload':        'iconLink'
            },
            
            filterOnSelect: function(e) {
                e.preventDefault();
                this.$el.resetDataStore();
                DS.set('category', $( '#element' ).val());
                DS.set('render', true);
                DS.set('usernickname', window.env.globals.current_user.nickname);
                var pathArray = window.location.pathname.split( '/' );
                if (pathArray[1] == 'photos'){
                    DS.set('entity', 'photos');
                    DS.set('route', '/photos/' + DS.get('category'));
                    Backbone.history.navigate(DS.get('route'), {trigger: false});
                    this.filter('photo');
                } else if (pathArray[1] == 'members'){
                    if (pathArray[2].match('all|latest') || pathArray[2] == ''){
                        DS.set('entity', 'members');
                        DS.set('route', '/members/' + DS.get('category'));
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        this.filter('member');
                    } else {
                        DS.set('entity', 'member');
                        DS.set('nickname', pathArray[2]);
                        DS.set('target_user', DS.getAll('member').where({nickname: DS.get('nickname')})[0]);
                        DS.set('route', '/members/' + DS.get('nickname') + '/' + DS.get('category'));
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        this.filter('photo');
                    }
                }
            },
            
            iconLink: function(e) {
                e.preventDefault();
                    this.$el.resetDataStore();
                    DS.set('category', 'latest');
                    DS.set('render', 'true');
                    DS.set('usernickname', window.env.globals.current_user.nickname);
                    DS.set('userid', window.env.globals.current_user.id);
                    if (e.currentTarget.classList[1] == 'fa-users'){
                        DS.set('entity', 'members');
                        DS.set('route', '/members/' + DS.get('category'));
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        this.filter('member');
                    } else if (e.currentTarget.classList[1] == 'fa-picture-o'){
                        DS.set('entity', 'photos');
                        DS.set('route', '/photos/' + DS.get('category'));
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        this.filter('photo');
                    } else if (e.currentTarget.classList[1] == 'fa-briefcase'){
                        DS.set('entity', 'author');
                        DS.set('nickname', window.env.globals.current_user.nickname);
                        DS.set('usernickname', window.env.globals.current_user.nickname);
                        DS.set('target_user', DS.getAll('member').where({nickname: DS.get('usernickname')})[0]);
                        DS.set('route', '/members/' + DS.get('usernickname'));
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        this.filter('photo');
                    } else if (e.currentTarget.classList[1] == 'fa-home'){
                        DS.set('collection', DS.getAll('photo'));
                        DS.set('counts', this.$el.getCounts(DS.get('collection')));
                        DS.set('entity', 'home');
                        DS.set('route', '/home');
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        AppView(new HeaderView({id: 'header'}));
                        this.render();
                        AppView(new HomeView({id: 'main-view'}));
                    } else if (e.currentTarget.classList[1] == 'fa-upload'){
                        DS.set('collection', DS.getAll('photo'));
                        DS.set('counts', this.$el.getCounts(DS.get('collection')));
                        DS.set('entity', 'upload');
                        DS.set('route', '/photos/upload');
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        AppView(new HeaderView({id: 'header'}));
                        this.render();
                        AppView(new UploadFormView({id: 'main-view'}));
                    }
            },

            filter: function(item){
                if (DS.get('category') == 'all' || DS.get('category') == 'latest'){
                    if (DS.get('nickname')){
                        DS.set('collection', DS.getAll(item).where({nickname: DS.get('nickname')}));
                        DS.set('counts', this.$el.getCounts(DS.get('collection')));
                        if (DS.get('category') == 'all') {
                            DS.set('collection', DS.get('collection').splice(0,100));
                        } else if (DS.get('category') == 'latest'){
                            DS.set('collection', DS.get('collection').splice(0,10));
                        }
                    } else {
                        DS.set('counts', this.$el.getCounts(DS.getAll(item)));
                        var collection = DS.getAll(item).sortBy('timestamp');
                        if (DS.get('category') == 'all') {
                            DS.set('collection', DS.getAll(item).first(100));
                        } else if (DS.get('category') == 'latest'){
                            DS.set('collection', DS.getAll(item).first(10));
                        }
                    }
                    this.rendericonlinks();
                } else {
                    if (DS.get('nickname') && DS.get('category')){
                        DS.set('counts', this.$el.getCounts(DS.getAll(item).where({nickname: DS.get('nickname')})));
                        DS.set('collection', DS.getAll(item).where({nickname: DS.get('nickname'),
                            category: DS.get('category') }));

                    } else if (DS.get('category')){
                        DS.set('counts', this.$el.getCounts(DS.getAll('photo')));
                        DS.set('collection', DS.getAll(item).where({category: DS.get('category')}));
                    } else if (DS.get('nickname')){
                        DS.set('collection', DS.getAll(item).where({nickname: DS.get('nickname')}));
                        DS.set('counts', this.$el.getCounts(DS.getAll(item)));
                    }
                    this.rendericonlinks();
                }
            },

            rendericonlinks: function(){
                AppView(new HeaderView({id: 'header'}));
                this.render();
                if (DS.get('entity') != 'members') {
                    var mainmodel;
                    if (DS.get('entity') == "member" || DS.get('entity') == "author"){
                        AppView(new ProfileMainView({id: 'main-view', model: DS.get('target_user')}));
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
            },

            render: function(){
                var assets = {};
                assets['category_counts'] = DS.get('counts');
                assets['category'] = DS.get('category');
                assets['photo_id'] = DS.get('postId');
                assets['entity'] = DS.get('entity');
                var current_user = {};
                current_user['nickname'] = DS.get('nickname');
                current_user['is_authenticated'] = function(){
                    return DS.get('authenticated');
                };
                $(this.el).html(window.env.render("nav.html", { 'assets': assets, 'current_user': current_user }));
                return this;
            }
        });
    }
);