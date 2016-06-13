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
                        $( ".fa-picture-o" ).trigger( "click" );
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