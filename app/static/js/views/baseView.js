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
                    this.currentView = this.photoCollection;
                    this.memberCollection = new MemberCollection();
                    this.memberCollection.fetch();
                } else {
                    this.memberCollection = options.memberCollection;
                    this.currentView = this.memberCollection;
                    this.photoCollection = new PhotoCollection();
                    this.photoCollection.fetch();
                }

                if(options.pageType == 'photo') {
                    AppView(new DetailView({el: '#main-image', 'collection': this.currentView}));
                } else if (options.pageType == 'home') {
                    AppView(new HomeView({el: '#home-page'}));
                } else {
                    AppView(new NavView({el: '#navbar'}));
                    AppView(new HeaderView({el: '#header'}));
                    AppView(new ContentMainView({el: '#main-image', 'collection': this.currentView}));
                    AppView(new ArchiveView({el: '#links', 'collection': this.currentView}));
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
                    'authenticated': null, 'count': null, 'postId': null, 'template': null };
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
                    itemDict.route = '/photos/' + itemDict.category;
                    itemDict.template = 'main_entry.html';
                    Backbone.history.navigate(itemDict.route, {trigger: true});
                } else if (pathArray[1] == 'members'){
                    if (pathArray[2].match('all|latest') || pathArray[2] == ''){
                        itemDict.collection = this.memberCollection;
                        itemDict.entity = 'members';
                        itemDict.route = '/members/' + itemDict.category;
                        itemDict.template = 'person.html';
                        Backbone.history.navigate(itemDict.route, {trigger: true});
                    } else {
                        itemDict.collection = this.photoCollection;
                        itemDict.entity = 'member';
                        itemDict.nickname = pathArray[2];
                        itemDict.target_user = this.memberCollection.where({nickname: itemDict.nickname});
                        itemDict.route = '/members/' + itemDict.nickname + '/' + itemDict.category;
                        itemDict.template = 'person.html';
                        Backbone.history.navigate(itemDict.route, {trigger: true});
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
                        itemDict.template = 'person.html';
                        itemDict.route = '/members/' + itemDict.category;
                        Backbone.history.navigate(itemDict.route, {trigger: true});
                    } else if (e.currentTarget.classList[1] == 'fa-picture-o'){
                        itemDict.collection = this.photoCollection;
                        itemDict.entity = 'photos';
                        itemDict.template = 'main_entry.html';
                        itemDict.route = '/photos/' + itemDict.category;
                        Backbone.history.navigate(itemDict.route, {trigger: true});
                    } else if (e.currentTarget.classList[1] == 'fa-briefcase'){
                        itemDict.collection = this.photoCollection;
                        itemDict.entity = 'author';
                        itemDict.template = 'person.html';
                        itemDict.target_user = this.memberCollection.where({nickname: itemDict.usernickname});
                        itemDict.route = '/members/' + itemDict.nickname;
                        Backbone.history.navigate(itemDict.route, {trigger: true});
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
                itemDict.route = '/members/' + itemDict.nickname;
                Backbone.history.navigate(itemDict.route, {trigger: true});
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
                itemDict.postId = e.target.parentNode.dataset.id;
                itemDict.route = '/photos/' + itemDict.postId;
                itemDict.usernickname = this.memberCollection.usernickname;
                Backbone.history.navigate(itemDict.route, {trigger: true});
                itemDict.render = true;
                AppView(new HeaderView({el: '#header'}), itemDict);
                AppView(new NavView({el: '#navbar'}), itemDict);
                AppView(new DetailView({el: '#main-image'}), itemDict);
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
                if ( !$('#main-image').length ) {
                    $('#photo-main').prepend("<ul id='main-image' class='img-list'></ul>")
                };
                AppView(new ContentMainView({el: '#main-image'}), itemDict);
                if (itemDict.entity == 'photos' || itemDict.entity == 'members'){
                    AppView(new ArchiveView({el: '#links', 'collection': itemDict.collection.splice(1)}), itemDict);
                } else {
                    AppView(new ArchiveView({el: '#links', 'collection': itemDict.collection}), itemDict);
                }
            }
        });
    }
);