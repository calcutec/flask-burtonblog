define(["jquery", "backbone", "nunjucks", "collections/photoCollection", "views/baseView", "views/uploadFormView",
    "collections/memberCollection"],
    function ($, Backbone, nunjucks, PhotoCollection, BaseView, UploadFormView, MemberCollection) {
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
                'members/:username/':   'portfolio',
                'members/:username/:category':   'membersfilteredphotos'
            },

            home: function () {
                var basePhotoCollection = new PhotoCollection();
                new BaseView({collection: basePhotoCollection, el: '#thisgreatpic'});
            },

            photos: function() {
                this.refreshdata(PhotoCollection);
            },

            filteredphotos: function(category) {
                this.refreshdata(PhotoCollection, category)
            },

            membersfilteredphotos: function(category) {
                this.refreshdata(PhotoCollection, category)
            },

            upload: function() {
                new UploadFormView();
            },
            
            members: function() {
                this.refreshdata(MemberCollection)
            },

            portfolio: function(username) {
                this.refreshdata(PhotoCollection, null, username)
            },

            refreshdata: function(BaseCollection, category, user) {
                var baseCollection = new BaseCollection();
                baseCollection.refreshFromServer({
                    success: function(freshData) {
                        if (category) {
                            var filteredItems = baseCollection.where({category: category});
                            var filteredCollection = new BaseCollection(filteredItems);
                            new BaseView({collection: filteredCollection, baseCollection: baseCollection, el: '#thisgreatpic'});

                        } else {
                            baseCollection.set(freshData['collection']);
                            new BaseView({collection: baseCollection, baseCollection: baseCollection, el: '#thisgreatpic'});
                        }
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            }
        });
    }
);