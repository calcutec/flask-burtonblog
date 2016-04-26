define(['jquery', 'backbone', 'views/contentMainView', 'views/archiveView', 'views/navView', 'views/headerView',
    'views/contentThumbnailView', 'views/detailView', 'collections/memberCollection', 'collections/photoCollection'],
    function($, Backbone, ContentMainView, ArchiveView, NavView, HeaderView, ContentThumbnailView, DetailView, 
             MemberCollection, PhotoCollection){
        return Backbone.View.extend({
            el: "#thisgreatpic",
            initialize: function(options){
                if (options.pageType == 'members') {
                    this.memberCollection = options.memberCollection;
                    new ContentMainView({el: "#main-image", 'collection': this.memberCollection}).attachToView();
                    new ArchiveView({el: "#links", 'collection': this.memberCollection}).attachToView();
                    this.photoCollection = new PhotoCollection();
                    this.photoCollection.fetch();
                    
                } else if(options.pageType == "photos") {
                    this.photoCollection = options.photoCollection;
                    new ContentMainView({el: "#main-image", 'collection': this.photoCollection}).attachToView();
                    new ArchiveView({el: "#links", 'collection': this.photoCollection}).attachToView();
                    this.memberCollection = new MemberCollection();
                    this.memberCollection.fetch();

                } else if(options.pageType == "home") {
                    this.photoCollection = options.photoCollection;
                    this.memberCollection = new MemberCollection();
                    this.memberCollection.fetch();
                    
                } else if(options.pageType == "photo") {
                    this.photoCollection = options.photoCollection;
                    new DetailView({el: '#photo-main', 'collection': this.photoCollection}).attachToView();
                    this.memberCollection = new MemberCollection();
                    this.memberCollection.fetch();
                } 
            },

            events: {
                'click a.member-link':   'memberLink',
                'click a.detail-link':   'detailLink',
                'change #element': 'filterOnSelect',
                'click .expand-one':   'expandInfoBox',
                'click i.fa-picture-o':   'iconLink',
                'click i.fa-users':   'iconLink',
                'click i.fa-briefcase':   'iconLink'
                // "click i.fa-upload":   "uploadLink",
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
                var pathArray = window.location.pathname.split( '/' );
                if (pathArray[1] == "photos"){
                    itemDict.collection = this.photoCollection;
                    itemDict.entity = "photos";
                    itemDict.route = '/photos/' + itemDict.category;
                    itemDict.template = "main_entry.html";
                    Backbone.history.navigate(itemDict.route, {trigger: true});
                } else if (pathArray[1] == "members"){
                    if (pathArray[2].match("all|latest") || pathArray[2] == ""){
                        itemDict.collection = this.memberCollection;
                        itemDict.entity = "members";
                        itemDict.route = '/members/' + itemDict.category;
                        Backbone.history.navigate(itemDict.route, {trigger: true});
                    } else {
                        itemDict.collection = this.photoCollection;
                        itemDict.entity = "member";
                        itemDict.nickname = pathArray[2];
                        itemDict.target_user = this.memberCollection.where({nickname: itemDict.nickname});
                        itemDict.route = '/members/' + itemDict.nickname + "/" + itemDict.category;
                        itemDict.template = "person.html";
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
            
            expandInfoBox: function(e) {
                e.preventDefault();
                $('.content-one').slideToggle('slow');
            },

            iconLink: function(e) {
                e.preventDefault();
                    var itemDict = this.getItemDict();
                    itemDict.authenticated = this.memberCollection.authenticated;
                    itemDict.category = "latest";
                    if (e.currentTarget.classList[1] == "fa-users"){
                        itemDict.collection = this.memberCollection;
                        itemDict.entity = "members";
                        itemDict.template = "person.html";
                        itemDict.route = '/members/' + itemDict.category;
                        Backbone.history.navigate(itemDict.route, {trigger: true});
                    } else if (e.currentTarget.classList[1] == "fa-picture-o"){
                        itemDict.collection = this.photoCollection;
                        itemDict.entity = "photos";
                        itemDict.template = "main_entry.html";
                        itemDict.route = '/photos/' + itemDict.category;
                        Backbone.history.navigate(itemDict.route, {trigger: true});
                    } else if (e.currentTarget.classList[1] == "fa-briefcase"){
                        itemDict.collection = this.photoCollection;
                        itemDict.entity = 'author';
                        itemDict.template = "person.html";
                        itemDict.nickname = this.memberCollection.usernickname;
                        itemDict.target_user = this.memberCollection.where({nickname: itemDict.nickname});
                        itemDict.route = '/members/' + itemDict.nickname;
                        Backbone.history.navigate(itemDict.route, {trigger: true});
                    }
                    this.filter(itemDict);
            },

            memberLink: function(e){
                e.preventDefault();
                var itemDict = this.getItemDict();
                itemDict.authenticated = this.memberCollection.authenticated;
                itemDict.entity = "member";
                itemDict.nickname = e.target.href.split('/')[4];
                itemDict.target_user = this.memberCollection.where({nickname: itemDict.nickname});
                itemDict.route = '/members/' + itemDict.nickname;
                Backbone.history.navigate(itemDict.route, {trigger: true});
                itemDict.collection = this.photoCollection.where({nickname: itemDict.nickname});
                itemDict.counts = this.getCounts(itemDict.collection);
                itemDict.template = "person.html";
                this.render(itemDict);
            },
            
            detailLink: function(e) {
                e.preventDefault();
                var itemDict = this.getItemDict();
                itemDict.collection = this.photoCollection;
                itemDict.authenticated = this.memberCollection.authenticated;
                itemDict.entity = "photo";
                itemDict.postId = e.target.parentNode.dataset.id;
                itemDict.route = '/photos/' + itemDict.postId;
                Backbone.history.navigate(itemDict.route, {trigger: true});
                $('#main-image', this.el).html('');
                $('#links').html('');
                new HeaderView({el: 'header'}).render(itemDict);
                new NavView({el: 'nav'}).render(itemDict);
                new DetailView({el: '#photo-main'}).render(itemDict);
            },

            filter: function(itemDict){
                if (itemDict.category == "all" || itemDict.category == "latest"){
                    if (itemDict.nickname){
                        itemDict.collection = itemDict.collection.where({nickname: itemDict.nickname});
                        itemDict.counts = this.getCounts(itemDict.collection);
                        if (itemDict.category == "all") {
                            itemDict.collection = itemDict.collection.splice(0,100)
                        } else if (itemDict.category == "latest"){
                            itemDict.collection = itemDict.collection.splice(0,10)
                        }
                        this.render(itemDict);
                    } else {
                        itemDict.counts = this.getCounts(itemDict.collection);
                        if (itemDict.category == "all") {
                            itemDict.collection = itemDict.collection.first(100)
                        } else if (itemDict.category == "latest"){
                            itemDict.collection = itemDict.collection.first(10)
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
                new HeaderView({el: 'header'}).render(itemDict);
                new NavView({el: 'nav'}).render(itemDict);
                new ContentMainView({el: '#photo-main'}).render(itemDict);
                $('ul#links', this.el).html('');
                if (itemDict.entity == "photos" || itemDict.entity == "members"){
                    itemDict.collection.splice(1).forEach(this.addOne, this);
                } else {
                    itemDict.collection.forEach(this.addOne, this);
                }
            },

            addOne: function (photo) {
                var photoThumbnailView = new ContentThumbnailView({ model: photo});
                $('ul#links', this.el).append(photoThumbnailView.render().el);
            }
        });
    }
);