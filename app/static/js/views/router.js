define(["jquery", "backbone", "nunjucks", "collections/photoCollection", "views/baseView", "views/uploadFormView",
    "collections/memberCollection"],
    function ($, Backbone, nunjucks, PhotoCollection, BaseView, UploadFormView, MemberCollection) {
        return Backbone.Router.extend({

            initialize: function () {
                var env = nunjucks.configure("static/templates");
                env.addGlobal("static_url", 'https://s3.amazonaws.com/aperturus/');
                Backbone.history.start({pushState: true});
            },

            routes: {
                '':                     'home',
                'home/':                'home',
                'photos/':              'photos',
                'photos/all/':          'photos',
                'photos/latest/':       'photos',
                'photos/upload/':       'upload',
                'photos/*category/':    'photos',
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
                new UploadFormView();
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