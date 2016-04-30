define(["jquery", "backbone", "nunjucks", "collections/photoCollection", "views/baseView", "views/uploadFormView",
    "views/appView", "views/homeView", "views/contentMainView", "collections/memberCollection"],
    function ($, Backbone, nunjucks, PhotoCollection, BaseView, UploadFormView, AppView, HomeView, ContentMainView,
              MemberCollection) {
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
                this.initial = true;
                Backbone.history.start({pushState: true});
                Backbone.View.prototype.close = function() {
                    this.remove();
                    $(this.el).empty();
                    this.unbind();
                    this.undelegateEvents();
                    delete(this);
                };


            },

            routes: {
                '':                               'home',
                'home(/)':                        'home',
                'photos(/)':                      'photos',
                'photos/all(/)':                  'photos',
                'photos/latest':                  'photos',
                'photos/upload(/)':               'upload',
                'photos/:category(/)':            'photos',
                'members(/)':                     'members',
                'members/all(/)':                 'members',
                'members/latest':                 'members',
                'members/:username(/)':           'photos',
                'members/:username/all(/)':       'photos',
                'members/:username/latest(/)':    'photos',
                'members/:username/:category(/)': 'photos'
            },


            getItemDict: function(){
                return {'route': null, 'collection': null, 'category': null, 'entity': null, 'nickname': null,
                    'authenticated': null, 'count': null, 'postId': null, 'template': null, 'render': null };
            },

            photo: function (id) {
                console.log(id);
            },

            home: function() {
                if (this.initial) {
                    this.initial = false;
                    this.refreshdata(PhotoCollection, "home");
                } else {
                    console.log("home rerouting");
                    window.location = Backbone.history.location.href;
                    // AppView(new BaseView({el: '#thisgreatpic'}));
                    // var itemDict = this.getItemDict;
                    // itemDict['entity'] = "home";
                    // itemDict['render'] = "true";
                    // AppView(new HomeView({id: 'main-view'}), itemDict);
                }
    
            },

            photos: function(category) {
                if (this.initial) {
                    this.initial = false;
                    if (category && category.match(/^\d+$/)) { // if category is a number
                        this.refreshdata(PhotoCollection, "photo");
                    }
                    else {
                        this.refreshdata(PhotoCollection, "photos");
                    }
                } else {
                    console.log("photos rerouting");
                    window.location = Backbone.history.location.href;
                }
            },

            upload: function() {
                new UploadFormView();
            },
            
            members: function() {
                if (this.initial) {
                    this.initial = false;
                    this.refreshdata(MemberCollection, "members")
                } else {
                    console.log("members rerouting")
                    window.location = Backbone.history.location.href;
                }
            },

            refreshdata: function(BaseCollection, PageType) {
                var baseCollection = new BaseCollection();
                baseCollection.fetch({
                    success: function() {
                        if (PageType == "photos" || PageType == "home" || PageType == "photo"){
                            AppView(new BaseView({photoCollection: baseCollection, el: '#thisgreatpic', pageType: PageType}));
                        } else if (PageType == "members"){
                            AppView(new BaseView({memberCollection: baseCollection, el: '#thisgreatpic', pageType: PageType}));
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