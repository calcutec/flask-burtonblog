define(['jquery', 'backbone', 'ds', 'nunjucks', 'models/photoModel', 'views/appView', 'views/detailView'],
    function($, Backbone, DS, nunjucks, PhotoModel, AppView, DetailView){
        return Backbone.View.extend({
            initialize: function(){
                this.collection = DS.get('collection');
                this.render()
            },
            events: {
                'submit': 'postnewentry'
            },
            postnewentry: function(e) {
                e.preventDefault();
                var newPostModel = new PhotoModel(this.$el.find('form').serializeObject());
                if (window.currentFile === null){
                    alert("file upload has failed")
                } else {
                    var photo = window.uploadedfilename;
                    newPostModel.set({'photo': photo});
                }
                newPostModel.save(null, {
                    type: 'POST',
                    success: function (model) {
                        DS.get('collection').add(model);
                        AppView(new DetailView({el: '#main-view', 'model': model}));
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