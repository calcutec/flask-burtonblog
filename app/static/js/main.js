window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Router: {},
  Data: {}
};

App.Router.MainRouter = Backbone.Router.extend({
    routes: { // sets the routes
        'home':     'home',
        'photos/latest/':   'photos',
        'create':   'create',
        'edit/:id': 'edit', // http://netbard.com/edit/7
        'people':   'people'
    },
    home: function() {
        console.log('now in view' + Backbone.history.location.href);
    },
    photos: function() {
        App.Collections.photolist = new App.Collections.PhotoList();
        App.Collections.photolist.refreshFromServer({
            success: function(freshData) {
                App.Collections.photolist.set(freshData['collection']);
                App.Views.mainView = new App.Views.MainView({collection: App.Collections.photolist});
                App.Views.mainView.attachToPhotoListView();
                App.Views.mainView.attachToPhotoMainView();
            },
            fail: function(error) {
                console.log(error);
            }
        });
    },
    edit: function(id){
        console.log('edit route with id: ' + id);
    },
    create: function(){
        console.log('now in view' + Backbone.history.location.href);
        App.Views.PhotoFormView.photoFormView = new App.Views.PhotoFormView();
    },
    people: function() {
        console.log('now in view' + Backbone.history.location.href);
    }
});

App.Views.LoginFormView = Backbone.View.extend({
    render: function() {
        this.$el.html(nunjucks.render("assets/forms/login_form.html"));
        return this;
    }
});

App.Models.Photo = Backbone.Model.extend( {
    url: "/photos",
    defaults: {
        photoid: '',
        author: '',
        header: '',
        body: '',
        photo: '',
        timestamp: ''
    },

    validate: function(attrs){
        if (!attrs.header){
            alert('Your post must have a title!');
        }
        if (!attrs.body){
            alert('Your post must have a story');
        }
    }
});

App.Views.PhotoMainView = Backbone.View.extend({
    initialize: function() {
        this.model.bind('change', this.render, this);
    },

    events: {
        'click a.link-button':   'memberLink',
        'click a.detail-link':   'detailLink',
    },

    memberLink: function(e) {
        e.preventDefault()
        console.log('member link clicked');
    },

    detailLink: function(e) {
        e.preventDefault()
        console.log('detail link clicked');
    },

    render: function() {
        this.$el.html(nunjucks.render("main_entry.html", {'photo': this.model.get('photo')}));
        return this;
    }
});

App.Views.PhotoListView = Backbone.View.extend({
    tagName: "li",
    initialize: function() {
        this.model.bind('change', this.render, this);
        console.log('model created');
        //this.listenTo(this.model, "change", this.savePost); // calls render function once name changed
        //this.listenTo(this.model, "destroy", this.removejunk); // calls remove function once model deleted
        //this.listenTo(this.model, "removeMe", this.removejunk); // calls remove function once model deleted
    },

    events: {
        'click a.link-button':   'memberLink',
        'click .edit':   'editPost',
        'click .edit-button':   'editPost',
        'click .submit-button':   'updatePost',
        'click .delete-button': 'deletePost'
    },

    memberLink: function(e) {
        e.preventDefault()
        console.log('member link clicked');
    },

    showImage: function() {
        console.log('button clicked');
    },

    // savePost: function(){
    //     this.model.save(null, {
    //         success: function (model, response) {
    //             if (response.updatedsuccess == true){
    //                 return response;
    //             }
    //             if (response.savedsuccess == true){
    //                 new App.Views.Photo({model:model}).render();
    //                 this.remove();
    //                 return response;
    //             }
    //             return response;
    //         },
    //         error: function () {
    //             alert('your poem did not save properly..')
    //         },
    //         wait: true
    //     });
    // },
    
    editPost: function(e){
        e.preventDefault();
    },
    updatePost: function(e){
        e.preventDefault();
        console.log('updating post..')
    },
    deletePost: function(e){
        e.preventDefault();
        alert("Do you really want to destroy this post?");
        this.model.destroy({
          success: function() {
            console.log('model completely destroyed..');
          }
        });
    },
    // removejunk: function(){
    //     // same as this.$el.remove();
    //     this.remove();
    //     // unbind events that are set on this view
    //     this.off();
    //     // remove all models bindings made by this view
    //     this.model.off( null, null, this );
    // },
    render: function() {
        this.$el.html(nunjucks.render("archive_entry.html", this.model.toJSON()));
        return this;
    }
});

App.Views.MainView = Backbone.View.extend({
    initialize: function(options){
        _.extend(this, _.pick(options, "page_mark"));
        //this.collection.bind('change', this.renderSideMenu, this);
        //this.renderSideMenu();
        //this.render();
        this.listenTo(this.collection, 'add', this.render, this);
    },
    events: {
        "change #labeler" : "applyLabel",
        "click #markallread" : "markallread",
        "click #archive" : "archive",
        "click #allmail" : "allmail",
        "click #inbox": "inbox",
        "click #starred": "starred",
        "keyup #search" : "search"
    },
    render: function() {
        this.renderMainPhoto(this.collection.last());
        this.renderPhotoList(this.collection);
        this.renderTitle();
    },
    renderTitle: function(){
        var headline = $("#headline");
        headline.html('');
        headline.html(
            nunjucks.render('title.html', {'page_mark': this.page_mark})
        );
    },
    renderMainPhoto: function(latestrecord){
        $('div#photo-main', this.el).html('');
        var photoMainView = new App.Views.PhotoMainView({el:"#photo-main", model: latestrecord});
        $('div#photo-main', this.el).append(photoMainView.render().el);
    },
    renderPhotoList: function(collection){
        var target = $('ul#img-list', this.el);
        target.html('');
        var self = this;
        _.each( collection.models.slice(1,7), function(model) {
            //console.log(model.get("id"));
            self.addOneToList(model);
        }, this);
    },
    addOneToList: function (photo) {
        var photoView = new App.Views.PhotoListView({ model: photo});
        $('ul#img-list', this.el).append(photoView.render().el);
    },
    attachToPhotoListView: function(){
        var self = this;
        $("#links li").each(function(){
            var photoEl = $(this);
            var id = photoEl.data().id;
            var photo = self.collection.get(id);
            new App.Views.PhotoListView({
                model: photo,
                el: photoEl
            });
        });
    },
    attachToPhotoMainView: function(){
        var mainPhotoEl = $("#main-image");
        var id = mainPhotoEl.find('img').data().id;
        var photo = this.collection.get(id);
        App.Views.photoMainView = new App.Views.PhotoMainView({
            model: photo,
            el: mainPhotoEl
        });
    }
    //renderSideMenu: function(){
    //    $("#summary").html(
    //        nunjucks.render('summary_template.html', {
    //            'inbox': this.collection.unread_count(),
    //            'starred':this.collection.starcount()
    //        })
    //    );
    //},
});

App.Collections.PhotoList = Backbone.Collection.extend({
    url: "/photos",
    model: App.Models.Photo,

    localStorage: new Backbone.LocalStorage("photos"),

    refreshFromServer : function(options) {
        return Backbone.ajaxSync('read', this, options);
    },

    /**
     * @param {{myPhotos:string}} response
     */
    parse: function(response){
        return response.myPhotos
    },
    // unread: function() {
    //     return _(this.filter( function(photo) { return !photo.get('read');} ) );
    // },

    inbox: function(){
        return _(this.filter( function(photo) { return !photo.get('archived');}));
    },

    starred: function(){
        return _(this.filter( function(photo) { return photo.get('star');}));
    },

    // unread_count: function() {
    //     return (this.filter ( function(photo) { return !photo.get('read');})).length;
    // },

    // labelled:function(label){
    //     return _(this.filter( function(photo) { return label in photo.get('label') } ));
    // },

    // starcount: function(){
    //     return (this.filter( function(photo) { return photo.get('star')})).length;
    // },

    search: function(word){
        if (word=="") return this;

        var pat = new RegExp(word, 'gi');
        return _(this.filter(function(photo) {
            return pat.test(photo.get('subject')) || pat.test(photo.get('sender')); }));
    },

    // byauthor: function (author_id) {
    //    var filtered = this.filter(function (post) {
    //        return photo.get("author") === author_id;
    //    });
    //    return new App.Collections.PhotoList(filtered);
    // },

    comparator: function(photo){
        return photo.get('timestamp');
    }
});

App.Views.PhotoFormView = Backbone.View.extend({
    el: '#body-form',
    initialize: function(){
        this.render();
        new App.Views.S3FormView();
    },
    render: function() {
        this.$el.html('');
        this.$el.html(nunjucks.render('/assets/forms/photo_form.html'));
        return this;
    }
});

App.Views.PhotoTextFormView = Backbone.View.extend({
    el: '#photo-textform-target',

    initialize: function(){
        this.render()
    },
    events: {
        'submit': 'postnewentry',
        'click .submit-button':   'updatePost',
        'click #test-button':   'testAlert'
    },
    postnewentry: function(e) {
        e.preventDefault();
        var newPostModel = new App.Models.Photo(this.$el.find('form').serializeObject());
        if (App.Data.currentFile === null){
            alert("file upload has failed")
        } else {
            var photo = window.uploadedfilename;
            newPostModel.set({'photo': photo});
        }
        newPostModel.save(null, {
            success: function (model, response) {
                App.Collections.photolist.add(model);
                return response;
            },
            error: function () {
                alert('your poem did not save properly..')
            },
            wait: true
        });
    },
    render: function() {
        var csrfToken = $('meta[name=csrf-token]').attr('content');
        this.$el.html(nunjucks.render('/assets/forms/photo_text_form.html',
            { "csrf_token": csrfToken }));
        return this;
    }
});

App.Models.S3Form = Backbone.Model.extend( {
    url: "/upload"
});


App.Views.S3FormView = Backbone.View.extend({
    el: '#photo-s3form-target',
    initialize: function() {
        this.model = new App.Models.S3Form();
        this.listenTo(this.model, 'sync', this.render);
        this.listenTo(this.model, 'destroy', this.dispose);
        this.model.fetch();
    },
    events: {
        'change #file-input': 'validateanddisplaysample',
        'submit': 'capturesubmit'
    },

    dispose: function() {
            // same as this.$el.remove();
        this.remove();

        // unbind events that are
        // set on this view
        this.off();

        // remove all models bindings
        // made by this view
        this.model.off( null, null, this );

    },

    capturesubmit: function(e) {
        e.preventDefault();
        var fd = new FormData();
        window.uploadedfilename = 'user-images/' + (new Date).getTime() + '-' + App.Data.currentFile.name;
        fd.append('key', window.uploadedfilename);
        fd.append('acl', this.model.get('acl'));
        fd.append('policy', this.model.get('policy'));
        fd.append('success_action_status', this.model.get('success_action_status'));
        fd.append('x-amz-algorithm', this.model.get('x-amz-algorithm'));
        fd.append('x-amz-credential', this.model.get('x-amz-credential'));
        fd.append('x-amz-date', this.model.get('x-amz-date'));
        fd.append('x-amz-signature',this.model.get('x-amz-signature'));
        if (typeof(App.Data.serverBlob) !== "undefined") {
            fd.append('file', App.Data.serverBlob);
        } else {
            fd.append('file', App.Data.currentFile);
        }

        /**
         * @param {{total:string}} e
         */
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress',function(e){
            $( "#progress-bar").html(e.loaded+" of "+e.total+" bytes loaded");
        }, false);

        var self=this;
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    self.model.destroy();
                    $('#exif').hide();
                    new App.Views.PhotoTextFormView();
                } else {
                    console.log(xhr.statusText);
                }

            }
        };
        xhr.open('POST', 'https://aperturus.s3.amazonaws.com/', true);
        xhr.send(fd);
    },

    validateanddisplaysample: function(e) {
        e.preventDefault();
        //Get reference of FileUpload.
        var fileUpload = this.$el.find("#file-input");
        //Check whether the file is valid Image.
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.jpeg)$");
        if (regex.test(fileUpload.val().toLowerCase())) {
            //Check whether HTML5 is supported.
            if (fileUpload.prop('files') != "undefined") {
                App.Data.currentFile = e.target.files[0];
                //Initiate the FileReader object.
                var reader = new FileReader();
                //Read the contents of Image File.
                reader.readAsDataURL(fileUpload.prop('files')[0]);
                var self = this;
                reader.onload = function (e) {
                    //Initiate the JavaScript Image object.
                    var image = new Image();
                    //Set the Base64 string return from FileReader as source.
                    image.src = e.target.result;
                    //Validate the File Height and Width.
                    image.onload = function () {
                        var height = this.height;
                        var width = this.width;
                        var size = App.Data.currentFile.size;
                        if (width < 648 || height < 432) {
                            alert("Images must be at least 648px in width and 432px in height");
                            return false;
                        } else {
                            self.generateUploadFormThumb(self, App.Data.currentFile);
                        }
                        if (height > 4896 || width > 4896 || size > 2000000) {
                            self.generateServerFile(App.Data.currentFile);
                        }
                    };
                }
            } else {
                alert("This browser does not support HTML5.");
                return false;
            }
        } else {
            alert("Please select a jpeg or png image file.");
            return false;
        }
    },

    generateUploadFormThumb: function(self, nowCurrentFile){
        loadImage(
           nowCurrentFile,
           function (img) {
               if(img.type === "error") {
                   alert("Error loading image " + nowCurrentFile);
                   return false;
               } else {
                   self.replaceResults(img, nowCurrentFile);
                   loadImage.parseMetaData(nowCurrentFile, function (data) {
                       if (data.exif) {
                           self.displayExifData(data.exif);
                       }
                   });
               }
           },
           {maxWidth: 648}
        );
    },

    generateServerFile: function(nowCurrentFile){
        loadImage(
            nowCurrentFile,
            function (img) {
                if(img.type === "error") {
                    console.log("Error loading image " + nowCurrentFile);
                } else {
                    if (img.toBlob) {
                        img.toBlob(
                            function (blob) {
                                App.Data.serverBlob = blob

                            },
                            'image/jpeg'
                        );
                    }
                }
            },
            {maxWidth: 4896, canvas:true}
        );
    },

    replaceResults: function (img) {
        var content;
        if (!(img.src || img instanceof HTMLCanvasElement)) {
          content = $('<span>Loading image file failed</span>')
        } else {
          content = $(img);
        }
        $('#result').children().replaceWith(content.addClass('u-full-width').removeAttr('width').removeAttr('height').fadeIn());
        $('#photo-submit').removeClass("hide");
    },

    displayExifData: function (exif) {  // Save Exif data to an entry model attribute to save on Flask model
        var tags = exif.getAll(),
            table = $('#exif').find('table').empty(),
            row = $('<tr></tr>'),
            cell = $('<td></td>'),
            prop;
        for (prop in tags) {
            if (tags.hasOwnProperty(prop)) {
                if(prop in {'Make':'', 'Model':'', 'DateTime':'', 'ShutterSpeedValue':'', 'FNumber':'',
                        'ExposureProgram':'', 'PhotographicSensitivity':'', 'FocalLength':'',
                        'FocalLengthIn35mmFilm':'', 'LensModel':'', 'Sharpness':'', 'PixelXDimension':'',
                        'PixelYDimension':''}) {
                        table.append(
                            row.clone()
                                .append(cell.clone().text(prop))
                                .append(cell.clone().text(tags[prop]))
                        );
                }
            }
            //if (tags.hasOwnProperty(prop)) {
            //    if(prop in {'Make':'', 'Model':'', 'DateTime':'', 'ExposureTime':'', 'ShutterSpeedValue':'',
            //        'FNumber':'', 'ExposureProgram':'', 'MeteringMode':'', 'ExposureMode':'', 'WhiteBalance':'',
            //        'PhotographicSensitivity':'', 'FocalLength':'', 'FocalLengthIn35mmFilm':'', 'LensModel':'',
            //        'Sharpness':'', 'PixelXDimension':'', 'PixelYDimension':''}) {
            //            table.append(
            //                row.clone()
            //                    .append(cell.clone().text(prop))
            //                    .append(cell.clone().text(tags[prop]))
            //            );
            //    }
            //}
        }
    },

    render: function() {
        this.$el.html(nunjucks.render('/assets/forms/S3_upload_form.html'));
        return this;
    }
});

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

$(document).ready(function() {
    var env = nunjucks.configure('/static/templates');
    env.addGlobal("static_url", 'https://s3.amazonaws.com/aperturus/');
    new App.Router.MainRouter();
    Backbone.history.start({pushState: true});
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
});