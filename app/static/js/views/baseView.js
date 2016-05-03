define(['jquery', 'backbone', 'views/contentMainView', 'views/profileMainView', 'views/archiveView',
    'views/membersView', 'views/navView', 'views/headerView', 'views/contentThumbnailView', 'views/memberThumbnailView',
    'views/detailView', 'views/appView', 'views/homeView', 'collections/memberCollection', 
    'collections/photoCollection'],
    function($, Backbone, ContentMainView, ProfileMainView, ArchiveView, MembersView, NavView, HeaderView, 
             ContentThumbnailView, MemberThumbnailView, DetailView, AppView, HomeView, MemberCollection){
        return Backbone.View.extend({
            el: '#thisgreatpic',
            initialize: function(options){
                if (options.photoCollection) {
                    this.photoCollection = options.photoCollection;
                    this.memberCollection = new MemberCollection();
                    var itemDict = this.getItemDict();
                    itemDict['entity'] = options.pageType;
                    var self = this;
                    this.memberCollection.fetch({
                        success: function() {
                            if(itemDict['entity'] == 'photo') {
                                AppView(new DetailView({el: '#main-view', 'collection': self.photoCollection}), itemDict);
                            } else if (itemDict['entity'] == 'home') {
                                AppView(new NavView({el: '#navbar'}));
                                AppView(new HeaderView({el: '#header'}));
                                AppView(new HomeView({el: '#main-view'}), itemDict);
                            } else if (itemDict['entity'] == 'photos'){
                                AppView(new NavView({el: '#navbar'}));
                                AppView(new HeaderView({el: '#header'}));
                                AppView(new ContentMainView({el: '#main-view', 'collection': self.photoCollection}), itemDict);
                                AppView(new ArchiveView({el: '#links', 'collection': self.photoCollection}));
                            } else if (itemDict['entity'] == 'members'){
                                AppView(new NavView({el: '#navbar'}));
                                AppView(new HeaderView({el: '#header'}));
                                AppView(new ArchiveView({el: '#links', 'collection': self.memberCollection}), itemDict);
                            }   else if (itemDict['entity'] == 'member'){
                                var model = self.memberCollection.where({nickname: options.username})[0];
                                AppView(new NavView({el: '#navbar'}));
                                AppView(new HeaderView({el: '#header'}));
                                AppView(new ProfileMainView({el: '#main-view', model: model}), itemDict);
                                AppView(new ArchiveView({el: '#links', 'collection': self.photoCollection}));
                            }
                        },
                        fail: function(error) {
                            console.log(error);
                        }
                    });
                }
            },

            events: {
                'click a.member-link':      'memberLink',
                'click a.detail-link':      'detailLink',
                'change #element':          'filterOnSelect',
                'click i.fa-picture-o':     'iconLink',
                'click i.fa-users':         'iconLink',
                'click i.fa-briefcase':     'iconLink',
                'click i.fa-home':          'iconLink'
                // 'click i.fa-upload':   'uploadLink',
            },

            getItemDict: function(){
                return {'route': null, 'collection': null, 'category': null, 'entity': null, 'nickname': null,
                    'authenticated': this.photoCollection.authenticated, 'count': null, 'postId': null,
                    'template': null, 'render': null };
            },

            filterOnSelect: function(e) {
                e.preventDefault();
                var itemDict = this.getItemDict();
                itemDict.authenticated = this.memberCollection.authenticated;
                itemDict.category = $( '#element' ).val();
                itemDict.render = true;
                itemDict.usernickname = this.memberCollection.usernickname;
                var pathArray = window.location.pathname.split( '/' );
                if (pathArray[1] == 'photos'){
                    itemDict.collection = this.photoCollection;
                    itemDict.entity = 'photos';
                    itemDict.route = '/photos/' + itemDict.category + '/';
                    Backbone.history.navigate(itemDict.route, {trigger: false});
                } else if (pathArray[1] == 'members'){
                    if (pathArray[2].match('all|latest') || pathArray[2] == ''){
                        itemDict.collection = this.memberCollection;
                        itemDict.entity = 'members';
                        itemDict.route = '/members/' + itemDict.category + '/' ;
                        Backbone.history.navigate(itemDict.route, {trigger: false});
                    } else {
                        itemDict.collection = this.photoCollection;
                        itemDict.entity = 'member';
                        itemDict.nickname = pathArray[2];
                        itemDict.target_user = this.memberCollection.where({nickname: itemDict.nickname})[0];
                        itemDict.route = '/members/' + itemDict.nickname + '/' + itemDict.category + '/';
                        Backbone.history.navigate(itemDict.route, {trigger: false});
                    }
                }
                this.filter(itemDict);
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
                    var itemDict = this.getItemDict();
                    itemDict.authenticated = this.memberCollection.authenticated;
                    itemDict.category = 'latest';
                    itemDict.render = 'true';
                    itemDict.usernickname = this.memberCollection.usernickname;
                    if (e.currentTarget.classList[1] == 'fa-users'){
                        itemDict.collection = this.memberCollection;
                        itemDict.entity = 'members';
                        itemDict.route = '/members/' + itemDict.category + '/';
                        Backbone.history.navigate(itemDict.route, {trigger: false});
                    } else if (e.currentTarget.classList[1] == 'fa-picture-o'){
                        itemDict.collection = this.photoCollection;
                        itemDict.entity = 'photos';
                        itemDict.route = '/photos/' + itemDict.category + '/';
                        Backbone.history.navigate(itemDict.route, {trigger: false});
                    } else if (e.currentTarget.classList[1] == 'fa-briefcase'){
                        itemDict.collection = this.photoCollection;
                        itemDict.entity = 'author';
                        itemDict.template = 'person.html';
                        itemDict.nickname = this.memberCollection.usernickname;
                        itemDict.usernickname = this.memberCollection.usernickname;
                        itemDict.target_user = this.memberCollection.where({nickname: itemDict.usernickname})[0];
                        itemDict.route = '/members/' + itemDict.usernickname + '/';
                        Backbone.history.navigate(itemDict.route, {trigger: false});
                    } else if (e.currentTarget.classList[1] == 'fa-home'){
                        itemDict.collection = this.photoCollection;
                        itemDict.entity = 'home';
                        itemDict.template = 'home_page.html';
                        itemDict.route = '/home/';
                        Backbone.history.navigate(itemDict.route, {trigger: false});
                        AppView(new HeaderView({id: 'header'}), itemDict);
                        AppView(new NavView({id: 'navbar'}), itemDict);
                        AppView(new HomeView({id: 'main-view'}), itemDict);
                        return true;
                    }
                    this.filter(itemDict);
            },

            memberLink: function(e){
                e.preventDefault();
                var itemDict = this.getItemDict();
                itemDict.authenticated = this.memberCollection.authenticated;
                itemDict.entity = 'member';
                itemDict.nickname = e.target.href.split('/')[4];
                itemDict.usernickname = this.memberCollection.usernickname;
                itemDict.target_user = this.memberCollection.where({nickname: itemDict.nickname})[0];
                itemDict.route = '/members/' + itemDict.nickname + '/';
                Backbone.history.navigate(itemDict.route, {trigger: false});
                itemDict.collection = this.photoCollection.where({nickname: itemDict.nickname});
                itemDict.counts = this.getCounts(itemDict.collection);
                itemDict.render = true;
                this.render(itemDict);
            },
            
            detailLink: function(e) {
                e.preventDefault();
                var itemDict = this.getItemDict();
                itemDict.collection = this.photoCollection;
                itemDict.authenticated = this.memberCollection.authenticated;
                itemDict.entity = 'photo';
                itemDict.postId = e.target.closest('a').dataset.id;
                itemDict.route = '/photos/' + itemDict.postId + '/';
                itemDict.usernickname = this.memberCollection.usernickname;
                Backbone.history.navigate(itemDict.route, {trigger: false});
                itemDict.render = true;
                AppView(new HeaderView({id: 'header'}), itemDict);
                AppView(new NavView({id: 'navbar'}), itemDict);
                var itemModel = itemDict.collection.get(itemDict.postId)
                AppView(new DetailView({id: 'main-view', model: itemModel}), itemDict);
            },

            filter: function(itemDict){
                if (itemDict.category == 'all' || itemDict.category == 'latest'){
                    if (itemDict.nickname){
                        itemDict.collection = itemDict.collection.where({nickname: itemDict.nickname});
                        itemDict.counts = this.getCounts(itemDict.collection);
                        if (itemDict.category == 'all') {
                            itemDict.collection = itemDict.collection.splice(0,100);
                        } else if (itemDict.category == 'latest'){
                            itemDict.collection = itemDict.collection.splice(0,10);
                        }
                        this.render(itemDict);
                    } else {
                        itemDict.counts = this.getCounts(itemDict.collection);
                        if (itemDict.category == 'all') {
                            itemDict.collection = itemDict.collection.first(100);
                        } else if (itemDict.category == 'latest'){
                            itemDict.collection = itemDict.collection.first(10);
                        }
                        this.render(itemDict);
                    }
                } else {
                    if (itemDict.nickname && itemDict.category ){
                        itemDict.counts = this.getCounts(itemDict.collection.where({nickname: itemDict.nickname}));
                        itemDict.collection = itemDict.collection.where({nickname: itemDict.nickname,
                            category: itemDict.category });

                    } else if (itemDict.category){
                        itemDict.counts = this.getCounts(itemDict.collection);
                        itemDict.collection = itemDict.collection.where({category: itemDict.category});
                    } else if (itemDict.nickname){
                        itemDict.collection = itemDict.collection.where({nickname: itemDict.nickname});
                        itemDict.counts = this.getCounts(itemDict.collection);
                    }
                    this.render(itemDict);
                }
            },

            render: function(itemDict){
                AppView(new HeaderView({id: 'header'}), itemDict);
                AppView(new NavView({id: 'navbar'}), itemDict);
                if (itemDict.entity != 'members') {
                    var mainmodel;
                    if (itemDict.entity == "member" || itemDict.entity == "author"){
                        mainmodel = itemDict.target_user;
                        AppView(new ProfileMainView({id: 'main-view', model: mainmodel}), itemDict);
                    } else {
                        mainmodel = itemDict.collection[0];
                        AppView(new ContentMainView({id: 'main-view', model: mainmodel}), itemDict);
                    }

                }
                if (itemDict.entity == 'photos' || itemDict.entity == 'member' || itemDict.entity == 'author'){
                    AppView(new ArchiveView({id: 'links', tagName: 'ul', className: 'img-list', 'collection': itemDict.collection.splice(1)}), itemDict);
                } else if (itemDict.entity == 'members') {
                    AppView(new MembersView({id: 'links', tagName: 'ul', className: 'img-list', 'collection': itemDict.collection}), itemDict);
                }
            }
        });
    }
);