define(["jquery", "backbone", "nunjucks", "collections/photoCollection", "views/baseView", "views/uploadFormView",
    "collections/memberCollection", "views/dataStore"],
    function ($, Backbone, nunjucks, PhotoCollection, BaseView, UploadFormView, MemberCollection, DataStore) {
        return Backbone.Router.extend({

            initialize: function () {
                var csrftoken = $('meta[name=csrf-token]').attr('content');
                $(function(){
                    $.ajaxSetup({
                        beforeSend: function(xhr, settings) {
                            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                                xhr.setRequestHeader("X-CSRFToken", csrftoken)
                            }
                        }
                    })
                });
                var env = nunjucks.configure("../static/templates");
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
                'photos/:category/':    'filteredphotos',
                'members/':             'members',
                'members/latest/':      'members',
                'members/:username/':   'portfolio'
            },

            home: function () {
                var photoCollection = new PhotoCollection();
                new BaseView({collection: photoCollection, el: '#thisgreatpic'});
            },

            photos: function() {
                var basePhotoCollection = new PhotoCollection();
                basePhotoCollection.refreshFromServer({
                    success: function(freshData) {
                        basePhotoCollection.set(freshData['collection']);
                        new BaseView({collection: basePhotoCollection, baseCollection: basePhotoCollection, 
                            el: '#thisgreatpic'});
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },
            filteredphotos: function(category) {
                var basePhotoCollection = new PhotoCollection();
                basePhotoCollection.refreshFromServer({
                    success: function(freshData) {
                        basePhotoCollection.set(freshData['collection']);
                        var filteredPhotos = basePhotoCollection.where({category: category});
                        var filteredPhotoCollection = new PhotoCollection(filteredPhotos);
                        new BaseView({collection: filteredPhotoCollection, baseCollection: basePhotoCollection,
                            el: '#thisgreatpic'});
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
                memberCollection.fetch({
                    success: function() {
                        var baseView = new BaseView({collection: memberCollection, el: '#thisgreatpic'});
                        baseView.attachToContentArchiveView();
                        var test = "test";
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },

            portfolio: function(username) {
                var photoCollection = new PhotoCollection();
                photoCollection.refreshFromServer({
                    success: function(freshData) {
                        photoCollection.set(freshData['collection']);
                        var baseView = new BaseView({collection: photoCollection, el: '#thisgreatpic'});
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            }
            
        });
    }
);