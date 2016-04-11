define(["jquery", "backbone", "nunjucks", "js/collections/photoCollection", "js/views/mainView"],
    function ($, Backbone, nunjucks, PhotoCollection, MainView) {
        return Backbone.Router.extend({

            initialize: function () {
                var env = nunjucks.configure("static/templates");
                env.addGlobal("static_url", 'https://s3.amazonaws.com/aperturus/');
                Backbone.history.start({pushState: true});
            },

            routes: {
                "": "home",
                'photos/latest/':   'photos'
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
            }
        });
    }
);