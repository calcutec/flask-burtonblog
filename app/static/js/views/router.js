define(["jquery", "backbone", "nunjucks", "collections/photoCollection", "views/mainView", "views/previewFormView"],
    function ($, Backbone, nunjucks, PhotoCollection, MainView, PreviewFormView) {
        return Backbone.Router.extend({

            initialize: function () {
                var env = nunjucks.configure("static/templates");
                env.addGlobal("static_url", 'https://s3.amazonaws.com/aperturus/');
                Backbone.history.start({pushState: true});
            },

            routes: {
                "": "home",
                'photos/latest/':   'photos',
                'photos/upload/':   'upload',
                'members/update/':   'updateprofileinfo'
            },

            home: function () {
                var photoCollection = new PhotoCollection();
                new MainView({collection: photoCollection, el: '#thisgreatpic'});
            },

            photos: function() {
                var photoCollection = new PhotoCollection();
                photoCollection.refreshFromServer({
                    success: function(freshData) {
                        photoCollection.set(freshData['collection']);
                        var mainView = new MainView({collection: photoCollection, el: '#thisgreatpic'});
                        mainView.attachCollectionToViews();
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },
            
            upload: function() {
                new PreviewFormView({el: "#image-preview"});
            }
            
        });
    }
);