define(["jquery", "backbone", "nunjucks", "collections/photoCollection", "views/baseView", "views/uploadFormView"],
    function ($, Backbone, nunjucks, PhotoCollection, BaseView, UploadFormView) {
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
                window.env = nunjucks.configure("../templates");
                env.addGlobal("static_url", 'https://s3.amazonaws.com/aperturus/static/');
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
                'members/latest(/)':              'members',
                'members/:username(/)':           'member',
                'members/:username/all(/)':       'member',
                'members/:username/latest(/)':    'member',
                'members/:username/:category(/)': 'member'
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
                    this.refreshdata("home");
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
                        this.refreshdata("photo");
                    }
                    else {
                        this.refreshdata("photos");
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
                    this.refreshdata("members")
                } else {
                    console.log("members rerouting");
                    window.location = Backbone.history.location.href;
                }
            },
            
            member: function(username) {
                if (this.initial) {
                    this.initial = false;
                    this.refreshdata("member", username)
                } else {
                    console.log("members rerouting");
                    window.location = Backbone.history.location.href;
                }
            },

            refreshdata: function(PageType, username) {
                        var photoCollection = new PhotoCollection;
                        photoCollection.fetch({
                            success: function() {
                                var current_user = {};
                                window.env.addGlobal("current_user", current_user);
                                current_user['is_authenticated'] = function(){
                                    return photoCollection.authenticated;
                                };
                                current_user['nickname']= photoCollection.usernickname;
                                new BaseView({ photoCollection: photoCollection, el: '#thisgreatpic', pageType:
                                PageType, username: username });
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            }
        });
    }
);