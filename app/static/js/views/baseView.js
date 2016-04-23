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
                        success: function(freshData) {
                            self.photoCollection.set(freshData['collection']);
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
                        success: function(freshData) {
                            self.memberCollection.set(freshData['collection']);
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
                'change #element': 'filterOnSelect',
                'click .expand-one':   'expandInfoBox',
                'click i.fa-picture-o':   'iconLink',
                'click i.fa-users':   'iconLink'
                // "click i.fa-upload":   "uploadLink",
            },

            filterOnSelect: function(e) {
                e.preventDefault();
                var category = $( "#element" ).val();
                var type = window.location.pathname.split("/")[1]
                var route;
                if (type == "photos"){
                    route = '/photos/' + category;
                    Backbone.history.navigate(route, {trigger: true});
                    this.filter(this.photoCollection, category, type)
                } else if (type == "members"){
                    if (window.location.pathname.split("/")[2].match("all|latest") ||
                        window.location.pathname.split("/")[2] == ""){
                        route = '/members/' + category;
                    } else {
                        route = '/members/' + window.location.pathname.split("/")[2] + "/" + category;
                    }
                    Backbone.history.navigate(route, {trigger: true});
                    this.filter(this.memberCollection, category, type)
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
                    if (e.currentTarget.classList[1] == "fa-users"){
                        route = '/members/' + category;
                        Backbone.history.navigate(route, {trigger: true});
                        this.filter(this.memberCollection, category, "members")
                    } else if (e.currentTarget.classList[1] == "fa-picture-o"){
                        route = '/photos/' + category;
                        Backbone.history.navigate(route, {trigger: true});
                        this.filter(this.photoCollection, category, "photos")
                    }
            },

            filter: function(collection, category, type){
                if (category == "all") {
                    this.render(collection.first(100),  category, type);
                } else if (category == "latest"){
                    this.render(collection.first(10), category, type);
                } else {
                    this.render(collection.where({category: category}), category, type);
                }
            },

            render: function(filteredcollection, category, type){
                new HeaderView({el: 'header'}).render(category, type);
                new NavView({el: 'nav'}).render(category, type);
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