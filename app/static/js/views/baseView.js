define(['jquery', 'backbone', "views/contentMainView", 'views/archiveView', 'views/navView', 'views/headerView', 'views/dataStore',
    'views/contentThumbnailView', "collections/memberCollection"],
    function($, Backbone, ContentMainView, ArchiveView, NavView, HeaderView, DataStore, ContentThumbnailView, MemberCollection){
        return Backbone.View.extend({
            el: "#thisgreatpic",
            initialize: function(options){
                if (options.pageType == "Members") {
                    this.attachToContentMainView();
                    this.attachToArchiveView();
                    this.memberCollection = this.collection;
                } else if(options.pageType == "Photos") {
                    this.attachToContentMainView();
                    this.attachToArchiveView();
                    this.memberCollection = new MemberCollection();
                    var self = this;
                    this.memberCollection.fetch({
                        success: function(freshData) {
                            self.memberCollection.set(freshData['collection']);
                        },
                        fail: function(error) {
                            console.log(error);
                        }
                    });
                } else if(options.pageType == "Home") {
                    this.memberCollection = new MemberCollection();
                    var self = this;
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
                // "click i.fa-upload":   "uploadLink",
                'click i.fa-users':   'membersLink',
                'click .expand-one':   'expandInfoBox',
                'change #element': 'filterOnSelect'
            },

            filterOnSelect: function(e) {
                e.preventDefault();
                var category = $( "#element" ).val();
                var route;
                if (window.location.pathname.split("/")[1] == "photos"){
                    route = '/photos/' + category;
                    Backbone.history.navigate(route, {trigger: true});
                    this.filter(this.collection, category)
                } else if (window.location.pathname.split("/")[1] == "members"){
                    if (window.location.pathname.split("/")[2].match("all|latest") ||
                        window.location.pathname.split("/")[2] == ""){
                        route = '/members/' + category;
                    } else {
                        route = '/members/' + window.location.pathname.split("/")[2] + "/" + category;
                    }
                    console.log(route);
                    this.filter(this.memberCollection, category)
                }
            },

            filter: function(collection, category){
                if (category == "all") {
                    this.render(collection.first(100));
                } else if (category == "latest"){
                    this.render(collection.first(10));
                } else {
                    this.render(collection.where({category: category}));
                }

            },


            renderMember: function(filteredcollection){
                $('#nav', this.el).html('');
                this.renderNav();
                $('header', this.el).html('');
                this.renderHeader();
                $('ul#links', this.el).html('');
                $('#main-image', this.el).html('');
                $('#home-page', this.el).remove();
                var contentMainView = new ContentMainView({el: '#photo-main', 'collection': filteredcollection});
                contentMainView.render();
                filteredcollection.splice(1).forEach(this.addOne, this);
            },

            render: function(filteredcollection){
                $('ul#links', this.el).html('');
                $('#main-image', this.el).html('');
                $('#home-page', this.el).remove();
                var contentMainView = new ContentMainView({el: '#photo-main', 'collection': filteredcollection});
                contentMainView.render();
                filteredcollection.splice(1).forEach(this.addOne, this);
            },


            renderNav: function(){
                $('nav', this.el).html('');
                var navView = new NavView({el: 'nav'});
                navView.render();
            },

            renderHeader: function(){
                $('header', this.el).html('');
                var headerView = new HeaderView({el: 'header'});
                headerView.render();
            },

            addOne: function (photo) {
                var photoThumbnailView = new ContentThumbnailView({ model: photo});
                $('ul#links', this.el).append(photoThumbnailView.render().el);
            },
        
            expandInfoBox: function(e) {
                e.preventDefault();
                $('.content-one').slideToggle('slow');
            },
            
            membersLink: function(e) {
                e.preventDefault();
                    var category = "latest";
                    var route = '/members/' + category;
                    Backbone.history.navigate(route, {trigger: true});
                    this.filter(this.memberCollection, category)
            },
            
            attachToContentMainView: function(){
                var contentMainView = new ContentMainView({el: "#main-image", 'collection': this.collection});
                contentMainView.attachToView()
            },
            
            attachToArchiveView: function(){
                var archiveView = new ArchiveView({el: "#links", 'collection': this.collection});
                archiveView.attachToView()
            }
        });
    }
);