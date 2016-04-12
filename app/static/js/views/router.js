define(["jquery", "backbone", "nunjucks", "collections/photoCollection", "views/baseView", "views/previewFormView", 
    "collections/memberCollection"],
    function ($, Backbone, nunjucks, PhotoCollection, BaseView, PreviewFormView, MemberCollection) {
        return Backbone.Router.extend({

            initialize: function () {
                var env = nunjucks.configure("static/templates");
                env.addGlobal("static_url", 'https://s3.amazonaws.com/aperturus/');
                Backbone.history.start({pushState: true});
            },

            routes: {
                "": "home",
                'photos/latest/':       'photos',
                'photos/upload/':       'upload',
                'members/':             'members',
                'members/latest/':      'members',
                'members/*username/':   'portfolio'
            },

            home: function () {
                var photoCollection = new PhotoCollection();
                new BaseView({collection: photoCollection, el: '#thisgreatpic'});
            },

            photos: function() {
                var photoCollection = new PhotoCollection();
                photoCollection.refreshFromServer({
                    success: function(freshData) {
                        photoCollection.set(freshData['collection']);
                        var baseView = new BaseView({collection: photoCollection, el: '#thisgreatpic'});
                        baseView.attachCollectionToViews();
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },
            
            upload: function() {
                new PreviewFormView({el: "#image-preview"});
            },
            
            members: function() {
                var memberCollection = new MemberCollection();
                memberCollection.refreshFromServer({
                    success: function(freshData) {
                        memberCollection.set(freshData['employees']);
                        var baseView = new BaseView({collection: memberCollection, el: '#thisgreatpic'});
                        baseView.attachToContentArchiveView();
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },

            portfolio: function() {
                var photoCollection = new PhotoCollection();
                photoCollection.refreshFromServer({
                    success: function(freshData) {
                        photoCollection.set(freshData['collection']);
                        var baseView = new BaseView({collection: photoCollection, el: '#thisgreatpic'});
                        baseView.attachCollectionToViews();
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            }
            
        });
    }
);