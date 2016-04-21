<<<<<<< HEAD
<<<<<<< Updated upstream
define(['jquery', 'backbone', "views/contentMainView", 'views/contentArchiveView', 'views/navView'],
=======
define(['jquery', 'backbone', "views/contentMainView", 'views/archiveView', 'views/navView'],
>>>>>>> master
    function($, Backbone, ContentMainView, ContentArchiveView, NavView){
=======
define(['jquery', 'backbone', "views/contentMainView", 'views/archiveView', 'views/navView', 'views/dataStore',
    'views/contentThumbnailView'],
    function($, Backbone, ContentMainView, ArchiveView, NavView, DataStore, ContentThumbnailView){
>>>>>>> Stashed changes
        return Backbone.View.extend({
            el: "#thisgreatpic",
            initialize: function(options){
                // this.listenTo(this.collection, "reset", this.renderViews());
                this.attachCollectionToViews();
                this.baseCollection = options.baseCollection;
            },

            events: {
                // "click i.fa-upload":   "uploadLink",
                "click .expand-one":   "expandInfoBox",
                'change #element': 'filterOnSelect'
            },

            filterOnSelect: function(e) {
                e.preventDefault();
                var category = $( "#element" ).val();
                var route;
                if (window.location.pathname.split("/")[1] == "photos"){
                    route = '/photos/' + category;
                    Backbone.history.navigate(route, {trigger: true});
                    this.filter(category)
                } else if (window.location.pathname.split("/")[1] == "members"){
                    if (window.location.pathname.split("/")[2].match("all|latest") ||
                        window.location.pathname.split("/")[2] == ""){
                        route = '/members/' + category;
                    } else {
                        route = '/members/' + window.location.pathname.split("/")[2] + "/" + category;
                    }
                    console.log(route);
                    window.location.href = route;
                }
            },

            filter: function(category){
                this.render(this.baseCollection.where({category: category}));
            },


            render: function(filteredcollection){
                $('ul#links', this.el).html('');
                filteredcollection.forEach(this.addOne, this);
            },

            addOne: function (photo) {
                var photoThumbnailView = new ContentThumbnailView({ model: photo});
                $('ul#links', this.el).append(photoThumbnailView.render().el);
            },
        
            expandInfoBox: function(e) {
                e.preventDefault();
                $('.content-one').slideToggle('slow');
            },
            
            attachCollectionToViews: function(){
                // DataStore.navView = new NavView();
                this.attachToContentMainView();
                this.attachToArchiveView();
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