define(["jquery", "backbone", "nunjucks", "collections/photoCollection", "views/baseView", "views/uploadFormView",
    "collections/memberCollection"],
    function ($, Backbone, nunjucks, PhotoCollection, BaseView, UploadFormView, MemberCollection) {
        return Backbone.Router.extend({

            initialize: function (options) {
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
                window.env = nunjucks.configure("http://localhost:8000/static/templates");
                env.addGlobal("static_url", 'https://s3.amazonaws.com/aperturus/');

                Backbone.history.start({pushState: true});

            },

            routes: {
                '':                             'home',
                'home/':                        'home',
                'photos/':                      'photos',
                'photos/all/':                  'photos',
                'photos/latest/':               'photos',
                'photos/upload/':               'upload',
                'photos/:category/':            'photos',
                'members/':                     'members',
                'members/all/':                 'members',
                'members/latest/':              'members',
                'members/:username/':           'photos',
                'members/:username/all/':        'photos',
                'members/:username/latest/':     'photos',
                'members/:username/:category/':  'photos'
            },


            photo: function (id) {
                console.log(id);
            },

            home: function() {
                this.refreshdata(PhotoCollection, "home");
            },

            photos: function(category) {
                if (category && category.match(/^\d+$/)) { // if category is a number
                    this.refreshdata(PhotoCollection, "photo");
                }
                else {
                    this.refreshdata(PhotoCollection, "photos");
                }

            },

            upload: function() {
                new UploadFormView();
            },
            
            members: function() {
                this.refreshdata(MemberCollection, "members")
            },

            refreshdata: function(BaseCollection, PageType) {
                var baseCollection = new BaseCollection();
                baseCollection.fetch({
                    success: function() {
                        if (PageType == "photos" || PageType == "home" || PageType == "photo"){
                            new BaseView({photoCollection: baseCollection, el: '#thisgreatpic', pageType: PageType});
                        } else if (PageType == "members"){
                            new BaseView({memberCollection: baseCollection, el: '#thisgreatpic', pageType: PageType});
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