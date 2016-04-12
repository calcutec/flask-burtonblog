define(['jquery', 'backbone', "views/contentMainView", 'views/contentArchiveView'],
    function($, Backbone, ContentMainView, ContentArchiveView){
        return Backbone.View.extend({
            el: "#thisgreatpic",
            initialize: function(options){
                //this.collection.bind('change', this.renderSideMenu, this);
                //this.renderSideMenu();
                //this.render();
                // this.listenTo(this.collection, 'add', this.render, this);
                //this.listenTo(this.collection, 'change', this.render, this);
            },
            events: {
                // "click i.fa-upload":   "uploadLink",
                "click .expand-one":   "expandInfoBox"
            },
        
            expandInfoBox: function(e) {
                e.preventDefault();
                $('.content-one').slideToggle('slow');
            },
            
            attachCollectionToViews: function(){
                this.attachToContentMainView();
                this.attachToContentArchiveView();
            },
            
            attachToContentMainView: function(){
                var contentMainView = new ContentMainView({el: "#photo-main", 'collection': this.collection});
                contentMainView.attachToView()
            },
            
            attachToContentArchiveView: function(){
                var contentArchiveView = new ContentArchiveView({el: "#links", 'collection': this.collection});
                contentArchiveView.attachToView()
            }
        });
    }
);