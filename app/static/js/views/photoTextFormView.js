define(['jquery', 'backbone', 'ds', 'nunjucks', 'models/photoModel', 'views/appView', 'views/detailView', 
    'views/navView', 'views/headerView'],
    function($, Backbone, DS, nunjucks, PhotoModel, AppView, DetailView, NavView, HeaderView){
        return Backbone.View.extend({
            initialize: function(){
                this.render()
            },
            events: {
                'submit': 'postnewentry'
            },
            postnewentry: function(e) {
                e.preventDefault();
                var newPostModel = new PhotoModel(this.$el.find('form').serializeObject());
                if (DS.get('currentFile') === null){
                    alert("file upload has failed")
                } else {
                    var photo = DS.get('uploadedfilename')
                    newPostModel.set({'photo': photo});
                    newPostModel.set({'exifTags': DS.get('exifTags')});
                }
                var self = this;
                newPostModel.save(null, {
                    type: 'POST',
                    success: function (model) {
                        DS.inject('photo', model);
                        DS.set({'route': null, 'collection': null, 'category': null, 'entity': null, 'nickname': null,
                            'authenticated': window.env.globals.current_user.is_authenticated(), 'count': null,
                            'postId': null, 'template': null, 'render': true });
                        DS.set('collection', DS.getAll('photo'));
                        DS.set('counts', self.$el.getCounts(DS.get('collection')));
                        DS.set('entity', 'photo');
                        DS.set('postId', model.id);
                        DS.set('route', '/photos/' + DS.get('postId') + '/');
                        DS.set('usernickname', window.env.globals.current_user.usernickname);
                        Backbone.history.navigate(DS.get('route'), {trigger: false});
                        DS.set('render', true);
                        AppView(new HeaderView({id: 'header'}));
                        AppView(new NavView({id: 'navbar'}));
                        AppView(new DetailView({id: 'main-view', model: model}));
                    },
                    error: function () {
                        alert('your poem did not save properly..')
                    },
                    wait: true
                });
            },
            
            render: function() {
                var csrfToken = $('meta[name=csrf-token]').attr('content');
                this.$el.html(nunjucks.render('photo_text_form.html',
                    { "csrf_token": csrfToken }));
                return this;
            }
        });
    }
);