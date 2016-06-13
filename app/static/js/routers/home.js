define(["jquery", "backbone", "nunjucks", "socketio", "ds", "collections/photoCollection", "views/baseView", 
    "views/uploadFormView"],
    function ($, Backbone, nunjucks, socketio, DS, PhotoCollection, BaseView, UploadFormView) {
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

                window.namespace = '/greatpic'; // change to an empty string to use the global namespace
                window.socket = socketio.connect('http://' + document.domain + ':' + location.port + namespace);

                $.fn.serializeObject = function() {
                    var o = {};
                    var a = this.serializeArray();
                    $.each(a, function() {
                        if (o[this.name] !== undefined) {
                            if (!o[this.name].push) {
                                o[this.name] = [o[this.name]];
                            }
                            o[this.name].push(this.value || '');
                        } else {
                            o[this.name] = this.value || '';
                        }
                    });
                    return o;
                };
                
                $.fn.getCounts = function(collection) {
                    var categoryarray = [];
                    collection.forEach(function(model){
                        categoryarray.push(model.get('category'))
                    });
    
                    var counts = {};
                    for(var i = 0; i < categoryarray.length; ++i) {
                        if(!counts[categoryarray[i]])
                            counts[categoryarray[i]] = 0;
                        ++counts[categoryarray[i]];
                    }
                    return counts;
                };
                
                $.fn.resetDataStore = function() {
                    DS.set({'route': null, 'collection': null, 'category': null, 'entity': null, 'nickname':
                        null, 'authenticated': window.env.globals.current_user.is_authenticated(), 'count': null,
                        'postId': null, 'template': null, 'render': null });
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
                        var id = category
                        this.refreshdata("photo", id);
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

            refreshdata: function(PageType, identifier) {
                DS.defineResource({
                    name: 'photo',
                    idAttribute: 'id',
                    collection: PhotoCollection
                });
                DS.findAll('photo').done(function() {
                    new BaseView({ el: '#thisgreatpic', pageType: PageType, identifier: identifier });
                });
            }
        });
    }
);