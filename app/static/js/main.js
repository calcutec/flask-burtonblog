window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Router: {}
};

App.Router.MainRouter = Backbone.Router.extend({
    routes: { // sets the routes
        '':         'start', // http://netbard.com/photos/portfolio/
        '_=_':         'start', // http://netbard.com/photos/portfolio/#_=_    //Workaround for Facebook redirect
        'create': 'create', // http://netbard.com/photos/portfolio/#create
        'edit/:id': 'edit' // http://netbard.com/photos/portfolio/#edit/7
    },
    start: function(){
        var photolist = new App.Collections.PhotoList(initialdata); // loaded from data.js
        console.log('now in view' + Backbone.history.location.href);
        var page_mark = Backbone.history.location.pathname.split("/")[2];
        if ( page_mark == "gallery") {
            new App.Views.MainView({el: "#photoapp", collection: photolist, page_mark:page_mark});
            new App.Views.PhotoFormView().render();
        } else if (page_mark == "login") {
            window.loginview = new App.Views.LoginFormView({el:'#body-form'}).render();
        }  else if (page_mark == "home") {
            new App.Views.MainView({el: "#photoapp", collection: photolist, page_mark:page_mark});
        }
        //var pgurl = "#" + Backbone.history.location.pathname.split("/")[2];
        //$("#nav ul li a").each(function(){
        //    console.log($(this).attr("href"))
        //    if($(this).attr("href") == pgurl) {
        //        $(this).addClass("active");
        //    }
        //})
    },
    edit: function(id){
        console.log('edit route with id: ' + id);
    },
    create: function(){
        console.log('View for creating photos rendered');
    }
});

App.Views.LoginFormView = Backbone.View.extend({
    render: function() {
        this.$el.html(nunjucks.render("assets/forms/login_form.html"));
        return this;
    },

    unrender: function(){
        $(this.el).remove();
    }
});

App.Models.Photo = Backbone.Model.extend( {
    defaults: {
        author: '',
        header: '',
        body: '',
        photo: '',
        entryPhotoName: '',
        subject: '',
        read: false,
        star: false,
        selected:false,
        archived:false,
        label: '',
        static_url: 'https://s3.amazonaws.com/aperturus/'
    },

    validate: function(attrs){
        if (!attrs.header){
            alert('Your post must have a title!');
        }
        if (!attrs.body){
            alert('Your post must have a story');
        }
    },

    markRead: function() {
        this.save( {read: true } );
    },

    starMail: function() {
        this.save( { star: !this.get("star")} );
    },

    archive: function(){
        this.save( { archived: true, selected:false} );
    },

    selectMail: function() {
        this.save( { selected: !this.get("selected")} );
    },

    setLabel: function(label){
        this.save( { label: label } );
    }
});

App.Views.PhotoMainView = Backbone.View.extend({
    initialize: function() {
        this.model.bind('change', this.render, this);
    },

    render: function() {
        this.$el.html(nunjucks.render("main_entry.html", this.model.toJSON()));
        return this;
    },

    unrender: function(){
        $(this.el).remove();
    }
});

App.Views.PhotoListView = Backbone.View.extend({
    tagName: "li",
    initialize: function() {
        this.model.bind('change', this.render, this);
        //this.listenTo(this.model, "change", this.savePost); // calls render function once name changed
        //this.listenTo(this.model, "destroy", this.removejunk); // calls remove function once model deleted
        //this.listenTo(this.model, "removeMe", this.removejunk); // calls remove function once model deleted
    },

    events: {
        'click .edit':   'editPost',
        'click .edit-button':   'editPost',
        'click .submit-button':   'updatePost',
        'click .delete-button': 'deletePost',
    },

    savePost: function(){
        this.model.save(null, {
            success: function (model, response) {
                if (response.updatedsuccess == true){
                    return response;
                }
                if (response.savedsuccess == true){
                    new App.Views.Post({model:model}).render();
                    this.remove();
                    return response;
                }
                return response;
            },
            error: function () {
                alert('your poem did not save properly..')
            },
            wait: true
        });
    },
    editPost: function(e){
        e.preventDefault();
        if (!App.Views.Post.editable) {
            var $target = $(e.target);
            $target.closest("article").find(".edit-me").addClass('edit-selected');
            var editSelected = $('.edit-selected');
            App.Views.Post.currentwysihtml5 = editSelected.wysihtml5({
                toolbar: {
                    "style": true,
                    "font-styles": true,
                    "emphasis": true,
                    "lists": true,
                    "html": false,
                    "link": false,
                    "image": false,
                    "color": false,
                    fa: true
                }
            });
            $target.closest("article").find('.edit-button').html("Submit Changes").attr('class', 'submit-button').css({'color':'red', 'style':'bold'});
            editSelected.css({"border": "2px #2237ff dotted"});
            editSelected.attr('contenteditable', false);
            App.Views.Post.editable = true;
        }
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
    removejunk: function(){
        // same as this.$el.remove();
        this.remove();
        // unbind events that are set on this view
        this.off();
        // remove all models bindings made by this view
        this.model.off( null, null, this );
    },


    render: function() {
        this.$el.html(nunjucks.render("archive_entry.html", this.model.toJSON()));
        return this;
    },

    unrender: function(){
        $(this.el).remove();
    }
});


App.Views.MainView = Backbone.View.extend({

    initialize: function(options){
        _.extend(this, _.pick(options, "page_mark"));
        //this.collection.bind('change', this.renderSideMenu, this);
        //this.renderSideMenu();
        this.renderMainPhoto(this.collection.models[0]);
        this.renderPhotoList(this.collection);
        this.renderTitle();
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

    search: function(){
        this.render(this.collection.search($("#search").val()));
    },
    starred: function(){
        this.render(this.collection.starred());
    },

    inbox: function(){
        this.render(this.collection.inbox());
    },

    allmail: function(){
        this.render(this.collection);
    },

    markallread : function(){
        this.collection.each(function(item){
          item.markRead();
        }, this);
    },

    applyLabel: function(){

        var label = $("#labeler").val();
        this.collection.each(function(item){
            if(item.get('selected') == true){
              item.setLabel(label);
            }
        }, this);
    },

    archive: function(){
        this.collection.each(function(item){
            if(item.get('selected') == true){
              item.archive();
            }
        }, this);
        this.render(this.collection.inbox());
    },

    renderTitle: function(){
        $("#headline").html(
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
    model: App.Models.Photo,

    localStorage: new Backbone.LocalStorage("photos"),

    parse: function(response){
        return response.myPhotos
    },

    unread: function() {
        return _(this.filter( function(photo) { return !photo.get('read');} ) );
    },

    inbox: function(){
        return _(this.filter( function(photo) { return !photo.get('archived');}));
    },

    starred: function(){
        return _(this.filter( function(photo) { return photo.get('star');}));
    },

    unread_count: function() {
        return (this.filter ( function(photo) { return !photo.get('read');})).length;
    },

    labelled:function(label){
        return _(this.filter( function(photo) { return label in photo.get('label') } ));
    },

    starcount: function(){
        return (this.filter( function(photo) { return photo.get('star')})).length;
    },

    search: function(word){
        if (word=="") return this;

        var pat = new RegExp(word, 'gi');
        return _(this.filter(function(photo) {
            return pat.test(photo.get('subject')) || pat.test(photo.get('sender')); }));
    },

    byauthor: function (author_id) {
       var filtered = this.filter(function (post) {
           return photo.get("author") === author_id;
       });
       return new App.Collections.PhotoList(filtered);
    },

    comparator: function(photo){
        return -photo.get('timestamp');
    }
});

App.Views.PhotoFormView = Backbone.View.extend({
    el: '#body-form',
    initialize: function(){
        this.on('render', this.afterRender);
        this.render();
    },
    render: function() {
        this.$el.html('');
        this.$el.html(nunjucks.render('/assets/forms/photo_form.html'));
        this.trigger('render');
        return this;
    },
    afterRender: function () {
        new App.Views.S3FormView().render();
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
        var newPostModel = new App.Models.Post(this.$el.find('form').serializeObject());
        if (currentFile === null){
            alert("file upload has failed")
        } else {
            var entryPhotoName = currentFile.name.split(".")[0]+"-hexgenerator."+currentFile.type.split("/")[1];
            newPostModel.set({'entryPhotoName': entryPhotoName});
        }
        newPostModel.save(null, {
            success: function (model, response) {
                alert('saved');
                new App.Views.Post({model:model}).render();
                return response;
            },
            error: function () {
                alert('your poem did not save properly..')
            },
            wait: true
        });
    },
    render: function() {
        this.$el.html(nunjucks.render('/assets/forms/photo_text_form.html', { "phototextform['csrf_token']": '12345' }));
        return this;
    }
});

App.Views.S3FormView = Backbone.View.extend({
    el: '#photo-s3form-target',
    events: {
        'change #file-input': 'validateanddisplaysample'
    },

    validateanddisplaysample: function(e) {
        e.preventDefault();
        //Get reference of FileUpload.
        var fileUpload = this.$el.find("#file-input")
        //Check whether the file is valid Image.
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.jpeg)$");
        if (regex.test(fileUpload.val().toLowerCase())) {
            //Check whether HTML5 is supported.
            if (fileUpload.prop('files') != "undefined") {
                currentFile = e.target.files[0];
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
                        var size = currentFile.size;
                        if (width < 648 || height < 432) {
                            alert("Images must be at least 648px in width and 432px in height");
                            return false;
                        } else {
                            self.generateUploadFormThumb(self, currentFile);
                        }
                        if (height > 4896 || width > 4896 || size > 2000000) {
                            self.generateServerFile(currentFile);
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

    generateUploadFormThumb: function(self, currentFile){
        loadImage(
           currentFile,
           function (img) {
               if(img.type === "error") {
                   alert("Error loading image " + currentFile);
                   return false;
               } else {
                   self.replaceResults(img, currentFile);
                   loadImage.parseMetaData(currentFile, function (data) {
                       if (data.exif) {
                           self.displayExifData(data.exif);
                       }
                   });
               }
           },
           {maxWidth: 648}
        );
    },

    generateServerFile: function(currentFile){
        loadImage(
            currentFile,
            function (img) {
                if(img.type === "error") {
                    console.log("Error loading image " + currentFile);
                } else {
                    if (img.toBlob) {
                        img.toBlob(
                            function (blob) {
                                serverBlob = blob

                            },
                            'image/jpeg'
                        );
                    }
                }
            },
            {maxWidth: 4896, canvas:true}
        );
    },

    replaceResults: function (img, currentFile) {
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
                if(prop in {'Make':'', 'Model':'', 'DateTime':'', 'ExposureTime':'', 'ShutterSpeedValue':'',
                    'FNumber':'', 'ExposureProgram':'', 'MeteringMode':'', 'ExposureMode':'', 'WhiteBalance':'',
                    'PhotographicSensitivity':'', 'FocalLength':'', 'FocalLengthIn35mmFilm':'', 'LensModel':'',
                    'Sharpness':'', 'PixelXDimension':'', 'PixelYDimension':''}) {
                        table.append(
                            row.clone()
                                .append(cell.clone().text(prop))
                                .append(cell.clone().text(tags[prop]))
                        );
                }
            }
        }
    },

    render: function() {
        //this.$el.html(this.template);
        this.$el.html(nunjucks.render('/assets/forms/photo_text_form.html', { "phototextform['csrf_token']": '12345' }));
        console.log('modal rendered');
        return this;
    }
});

$.fn.serializeObject = function()
{
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


$.fn.submitData = function(e){
    var data = new FormData(this);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress',function(e){
        console.log('now loading')
    }, false);
    xhr.onreadystatechange = function(e){
        if(xhr.readyState == 4){
          console.log(xhr.statusText) //complete! - check xhr.status
        }
    };
    xhr.open('POST', 'https://aperturus.s3.amazonaws.com/', true);
    xhr.send(data);
    return false;
};

$(document).ready(function() {
    $(function(){
        $('#main-menu').slicknav({
            prependTo:'#mobileMenu',
            closeOnClick: true,
            label: '',
            brand: 'Gallery'
        });

        $(document).on('click', "#main-menu .scroll, .slicknav_menu .scroll", function(e) {
            e.preventDefault();
            var h = $('#nav').outerHeight();
            if (!$('#main-menu').is(":visible")) {
                h = $('.slicknav_menu .slicknav_btn').outerHeight();
            }
            //var link = this;
            //$.smoothScroll({
            //    offset: -h,
            //    scrollTarget: link.hash
            //});
        });
    });
    var env = nunjucks.configure('/static/templates');
    env.addGlobal("static_url", 'https://s3.amazonaws.com/aperturus/');
    new App.Router.MainRouter();
    Backbone.history.start();

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

    $( "#s3-form" ).submit(function( e ) {
        e.preventDefault();
        var data = new FormData(this);
        if (typeof(serverBlob) !== "undefined") {
            data.append('image', serverBlob);
        }
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress',function(e){
            $( "#progress-bar").html(e.loaded+" of "+e.total+" bytes loaded");
        }, false);
        xhr.onreadystatechange = function(e){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    window.s3formview.$el.hide();
                    window.phototextformview = new App.Views.PhotoTextFormView();

                } else {
                    console.log(xhr.statusText)
                }

            }
        };
        xhr.open('POST', 'https://aperturus.s3.amazonaws.com/', true);
        xhr.send(data);
        return false;
    });

    //App.Collections.Post.postCollection = new App.Collections.Post();
    //App.Collections.Post.postCollection.fetch({
    //    success: function() {
    //        App.Views.Posts.poemListView = new App.Views.Posts({collection: App.Collections.Post.postCollection});
    //        App.Views.Posts.poemListView.attachToView();
    //    }
    //});
});