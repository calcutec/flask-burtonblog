define(['jquery', 'backbone', 'app', 'views/AppView', 'models/s3FormModel', 'views/photoInputsView'],
    function($, Backbone, app, AppView, S3FormModel, PhotoInputsView){
        return Backbone.View.extend({
            currentFile: null,
            coordinates: null,
            initialize: function (options) {
                this.collection = AppView.photoCollection;
            },

            events: {
                'change #file-input': 'validateanddisplaysample',
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
                        window.currentFile = e.target.files[0];
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
                                var size = window.currentFile.size;
                                if (width < 648 || height < 432) {
                                    alert("Images must be at least 648px in width and 432px in height");
                                    return false;
                                } else {
                                    self.generateUploadFormThumb(window.currentFile);
                                }
                                if (height > 4896 || width > 4896 || size > 2000000) {
                                    self.generateServerFile(window.currentFile);
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

            generateUploadFormThumb: function(nowCurrentFile){
                var self = this;
                var options = {
                  canvas: true,
                  pixelRatio: window.devicePixelRatio,
                  downsamplingRatio: 0.5
                };
                loadImage(
                   nowCurrentFile,
                   function (img) {
                       if(img.type === "error") {
                           return false;
                       } else {;
                           window.loadImage.parseMetaData(nowCurrentFile, function (data) {
                               if (data.exif) {
                                   options.orientation = data.exif[0x0112];
                                   self.displayExifData(data.exif);
                               }
                           });
                           self.createContent(img)
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
                                        window.serverBlob = blob

                                    },
                                    'image/jpeg'
                                );
                            }
                        }
                    },
                    {maxWidth: 4896, canvas:true}
                );
            },


            displayExifData: function(exif) {
                var tags = exif.getAll();
                var table = this.$el.find('table').empty();
                var row = $('<tr></tr>');
                var cell = $('<td></td>');
                var prop;
                for (prop in tags) {
                  if (tags.hasOwnProperty(prop)) {
                    if(prop in {'Make':'', 'Model':'', 'DateTime':'', 'ShutterSpeedValue':'', 'FNumber':'',
                            'ExposureProgram':'', 'PhotographicSensitivity':'', 'FocalLength':'',
                            'FocalLengthIn35mmFilm':'', 'LensModel':'', 'Sharpness':'', 'PixelXDimension':'',
                            'PixelYDimension':'', 'Orientation':''}) {
                            table.append(
                                row.clone()
                                    .append(cell.clone().text(prop))
                                    .append(cell.clone().text(tags[prop]))
                            );
                    }
                  }
                }
                $('#exif').show()
            },

            createContent: function(img) {
                var content = $(img);
                this.$el.find('#inputs').html(content.addClass('full-width').removeAttr('width').removeAttr('height').fadeIn());
                this.$el.find('#photo-submit').removeClass('hide');
            },

                
            render: function() {
                this.$el.html(window.env.render("upload_form.html"));
                this.renderInputs();
                return this;
            },
            
            renderInputs: function() {
                var s3FormModel = new S3FormModel();
                s3FormModel.fetch({
                    parse: true,
                    success: function () {
                        var photoInputsView = new PhotoInputsView({model: s3FormModel, id: "inputs-view", 
                            collection: this.photoCollection}).render()
                        $('#inputs-target').html(photoInputsView.render().el)
                        return false;

                    },
                    fail: function (error) {
                        console.log(error);
                    }
                });
                return this;
            }
        });
    }
);