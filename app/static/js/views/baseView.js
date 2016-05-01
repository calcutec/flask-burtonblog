define(['jquery', 'backbone', 'views/contentMainView', 'views/archiveView', 'views/navView', 'views/headerView',
    'views/contentThumbnailView', 'views/detailView', 'views/appView', 'views/homeView', 'collections/memberCollection',
    'collections/photoCollection'],
    function($, Backbone, ContentMainView, ArchiveView, NavView, HeaderView, ContentThumbnailView, DetailView, AppView,
             HomeView, MemberCollection, PhotoCollection){
        return Backbone.View.extend({
            el: '#thisgreatpic',
            initialize: function(options){
                if (options.photoCollection) {
                    this.photoCollection = options.photoCollection;
                    this.currentCollection = this.photoCollection;
                    this.memberCollection = new MemberCollection();
                    this.memberCollection.fetch();
                } else {
                    this.memberCollection = options.memberCollection;
                    this.currentCollection = this.memberCollection;
                    this.photoCollection = new PhotoCollection();
                    this.photoCollection.fetch();
                }

                var itemDict = this.getItemDict();
                if(options.pageType == 'photo') {
                    itemDict.entity = 'photo';
                    AppView(new DetailView({el: '#main-view', 'collection': this.currentCollection}), itemDict);
                } else if (options.pageType == 'home') {
                    itemDict.entity = 'home';
                    AppView(new HomeView({el: '#main-view'}), itemDict);
                } else if (options.pageType == 'photos'){
                    itemDict.entity = 'photos';
                    AppView(new NavView({el: '#navbar'}));
                    AppView(new HeaderView({el: '#header'}));
                    AppView(new ContentMainView({el: '#main-view', 'collection': this.currentCollection}), itemDict);
                    AppView(new ArchiveView({el: '#links', 'collection': this.currentCollection}));
                } else if (options.pageType == 'members'){
                    itemDict.entity = 'members';
                    AppView(new NavView({el: '#navbar'}));
                    AppView(new HeaderView({el: '#header'}));
                    AppView(new ArchiveView({el: '#links', 'collection': this.currentCollection}), itemDict);
                }
            },

            events: {
                'click a.member-link':   'memberLink',
                'click a.detail-link':   'detailLink',
                'change #element': 'filterOnSelect',
                'click i.fa-picture-o':   'iconLink',
                'click i.fa-users':   'iconLink',
                'click i.fa-briefcase':   'iconLink'
                // 'click i.fa-upload':   'uploadLink',
            },

            getItemDict: function(){
                return {'route': null, 'collection': null, 'category': null, 'entity': null, 'nickname': null,
                    'authenticated': null, 'count': null, 'postId': null, 'template': null, 'render': null };
            },
            
            sendAlert: function() {
                alert("im here");
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
                    itemDict.template = 'main_entry.html';
                    Backbone.history.navigate(itemDict.route, {trigger: false});
                } else if (pathArray[1] == 'members'){
                    if (pathArray[2].match('all|latest') || pathArray[2] == ''){
                        itemDict.collection = this.memberCollection;
                        itemDict.entity = 'members';
                        itemDict.route = '/members/' + itemDict.category + '/' ;
                        itemDict.template = 'person.html';
                        Backbone.history.navigate(itemDict.route, {trigger: false});
                    } else {
                        itemDict.collection = this.photoCollection;
                        itemDict.entity = 'member';
                        itemDict.nickname = pathArray[2];
                        itemDict.target_user = this.memberCollection.where({nickname: itemDict.nickname});
                        itemDict.route = '/members/' + itemDict.nickname + '/' + itemDict.category + '/';
                        itemDict.template = 'person.html';
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
                        itemDict.template = 'main_entry.html';
                        itemDict.route = '/photos/' + itemDict.category + '/';
                        Backbone.history.navigate(itemDict.route, {trigger: false});
                    } else if (e.currentTarget.classList[1] == 'fa-briefcase'){
                        itemDict.collection = this.photoCollection;
                        itemDict.entity = 'author';
                        itemDict.template = 'person.html';
                        itemDict.nickname = this.memberCollection.usernickname;
                        itemDict.usernickname = this.memberCollection.usernickname;
                        itemDict.target_user = this.memberCollection.where({nickname: itemDict.usernickname});
                        itemDict.route = '/members/' + itemDict.usernickname + '/';
                        Backbone.history.navigate(itemDict.route, {trigger: false});
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
                itemDict.target_user = this.memberCollection.where({nickname: itemDict.nickname});
                itemDict.route = '/members/' + itemDict.nickname + '/';
                Backbone.history.navigate(itemDict.route, {trigger: false});
                itemDict.collection = this.photoCollection.where({nickname: itemDict.nickname});
                itemDict.counts = this.getCounts(itemDict.collection);
                itemDict.template = 'person.html';
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
                AppView(new HeaderView({el: '#header'}), itemDict);
                AppView(new NavView({el: '#navbar'}), itemDict);
                AppView(new DetailView({id: 'main-view'}), itemDict);
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
                AppView(new HeaderView({el: '#header'}), itemDict);
                AppView(new NavView({el: '#navbar'}), itemDict);
                if (itemDict.entity != 'members') {
                    AppView(new ContentMainView({id: 'main-view'}), itemDict);
                }
                if (itemDict.entity == 'photos'){
                    AppView(new ArchiveView({id: 'links', tagName: 'ul', className: 'img-list', 'collection': itemDict.collection.splice(1)}), itemDict);
                } else {
                    AppView(new ArchiveView({id: 'links', tagName: 'ul', className: 'img-list', 'collection': itemDict.collection}), itemDict);
                }
            }
        });
    }
);