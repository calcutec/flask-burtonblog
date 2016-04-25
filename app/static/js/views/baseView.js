define(['jquery', 'backbone', 'views/contentMainView', 'views/archiveView', 'views/navView', 'views/headerView', 'views/dataStore',
    'views/contentThumbnailView', 'collections/memberCollection', 'collections/photoCollection'],
    function($, Backbone, ContentMainView, ArchiveView, NavView, HeaderView, DataStore, ContentThumbnailView,
             MemberCollection, PhotoCollection){
        return Backbone.View.extend({
            el: "#thisgreatpic",
            initialize: function(options){
                var self = this;
                if (options.pageType == 'members') {
                    this.memberCollection = options.memberCollection;
                    new ContentMainView({el: "#main-image", 'collection': this.memberCollection}).attachToView();
                    new ArchiveView({el: "#links", 'collection': this.memberCollection}).attachToView();
                    this.photoCollection = new PhotoCollection();
                    this.photoCollection.fetch({
                        success: function() {
                            console.log('success');
                        },
                        fail: function(error) {
                            console.log(error);
                        }
                    });
                } else if(options.pageType == "photos") {
                    this.photoCollection = options.photoCollection;
                    new ContentMainView({el: "#main-image", 'collection': this.photoCollection}).attachToView();
                    new ArchiveView({el: "#links", 'collection': this.photoCollection}).attachToView();
                    this.memberCollection = new MemberCollection();
                    this.memberCollection.fetch({
                        success: function() {
                            console.log('success');
                        },
                        fail: function(error) {
                            console.log(error);
                        }
                    });
                } else if(options.pageType == "home") {
                    this.photoCollection = options.photoCollection;
                    this.memberCollection = new MemberCollection();
                    this.memberCollection.fetch({
                        success: function(freshData) {
                            self.memberCollection.set(freshData['collection']);
                        },
                        fail: function(error) {
                            console.log(error);
                        }
                    });
                }
            },

            events: {
                'click a.member-link':   'memberLink',
                'change #element': 'filterOnSelect',
                'click .expand-one':   'expandInfoBox',
                'click i.fa-picture-o':   'iconLink',
                'click i.fa-users':   'iconLink'
                // "click i.fa-upload":   "uploadLink",
            },

            filterOnSelect: function(e) {
                e.preventDefault();
                var category = $( "#element" ).val();
                var entity = window.location.pathname.split("/")[1];
                var route;
                if (entity == "photos"){
                    route = '/photos/' + category;
                    Backbone.history.navigate(route, {trigger: true});
                    this.filter(this.photoCollection, category, entity)
                } else if (entity == "members"){
                    if (window.location.pathname.split("/")[2].match("all|latest") ||
                        window.location.pathname.split("/")[2] == ""){
                        route = '/members/' + category;
                    } else {
                        route = '/members/' + window.location.pathname.split("/")[2] + "/" + category;
                    }
                    Backbone.history.navigate(route, {trigger: true});
                    this.filter(this.memberCollection, category, entity)
                }
            },
            
            expandInfoBox: function(e) {
                e.preventDefault();
                $('.content-one').slideToggle('slow');
            },
            
            iconLink: function(e) {
                e.preventDefault();
                    var category = "latest";
                    var route;
                    var authenticated;
                    if (e.currentTarget.classList[1] == "fa-users"){
                        route = '/members/' + category;
                        Backbone.history.navigate(route, {trigger: true});
                        authenticated = this.memberCollection.authenticated;
                        this.filter(this.memberCollection, category, "members", authenticated)
                    } else if (e.currentTarget.classList[1] == "fa-picture-o"){
                        route = '/photos/' + category;
                        Backbone.history.navigate(route, {trigger: true});
                        authenticated = this.photoCollection.authenticated;
                        this.filter(this.photoCollection, category, "photos", authenticated)
                    }
            },

            memberLink: function(e){
                e.preventDefault();
                var category = e.target.href.split('/members/')[1].replace('/', '');
                var route = '/members/' + category;
                Backbone.history.navigate(route, {trigger: true});
                var authenticated = this.photoCollection.authenticated;
                this.render(this.photoCollection.where({nickname: category}), category, "member", authenticated);
            },

            filter: function(collection, category, entity, authenticated){
                if (category == "all") {
                    this.render(collection.first(100),  category, entity, authenticated);
                } else if (category == "latest"){
                    this.render(collection.first(10), category, entity, authenticated);
                } else {
                    this.render(collection.where({category: category}), category, entity, authenticated);
                }
            },

            render: function(filteredcollection, category, entity, authenticated){
                new HeaderView({el: 'header'}).render(category, entity, authenticated);
                new NavView({el: 'nav'}).render(category, entity, authenticated);
                new ContentMainView({el: '#photo-main', 'collection': filteredcollection}).render();
                $('ul#links', this.el).html('');
                filteredcollection.splice(1).forEach(this.addOne, this);
            },

            addOne: function (photo) {
                var photoThumbnailView = new ContentThumbnailView({ model: photo});
                $('ul#links', this.el).append(photoThumbnailView.render().el);
            }
        });
    }
);