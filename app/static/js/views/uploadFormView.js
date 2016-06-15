define(['jquery', 'backbone', 'ds', 'models/s3FormModel', 'views/photoInputsView'],
    function($, Backbone, DS, S3FormModel, PhotoInputsView){
        return Backbone.View.extend({
            currentFile: null,
            coordinates: null,
            
            events: {
                'change #file-input': 'validateanddisplaysample'
            },

            validateanddisplaysample: function(e) {
                e.preventDefault();
                //Get reference of FileUpload.
                DS.set('serverBlob', null);
                DS.set('currentFile', null);
                var fileUpload = this.$el.find("#file-input");
                //Check whether the file is valid Image.
                var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.jpeg)$");
                if (regex.test(fileUpload.val().toLowerCase())) {
                    //Check whether HTML5 is supported.
                    if (fileUpload.prop('files') != "undefined") {

                        DS.set('currentFile', e.target.files[0]);
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
                                var size = DS.get('currentFile').size;
                                if (width < 648 || height < 432) {
                                    alert("Images must be at least 648px in width and 432px in height");
                                    return false;
                                } else {
                                    self.generateUploadFormThumb(DS.get('currentFile'));
                                }
                                if (height > 4896 || width > 4896 || size > 2000000) {
                                    self.generateServerFile(DS.get('currentFile'));
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
                window.loadImage(
                   nowCurrentFile,
                   function (img) {
                       if(img.type === "error") {
                           return false;
                       } else {
                            if (DS.get('route') == '/members/upload') {
                                self.createContent(img);
                            } else {
                                window.loadImage.parseMetaData(nowCurrentFile, function (data) {
                                   if (data.exif) {
                                       self.displayExifData(data.exif);
                                       self.createContent(img)
                                   } else {
                                       alert('Please choose an image with exif data intact')
                                   }
                                });
                            }
                       }
                   },
                   {maxWidth: 648}
                );
            },

            generateServerFile: function(nowCurrentFile){
                window.loadImage(
                    nowCurrentFile,
                    function (img) {
                        if(img.type === "error") {
                            console.log("Error loading image " + nowCurrentFile);
                        } else {
                            if (img.toBlob) {
                                img.toBlob(
                                    function (blob) {
                                        DS.set('serverBlob', blob);

                                    },
                                    'image/jpeg'
                                );
                            }
                        }
                    },
                    {maxWidth: 4896, canvas:true}
                );
            },

            oddOrEven: function(rownumber) {
                return ( rownumber & 1 ) ? "odd" : "even";
            },

            displayExifData: function(exif) {
                var unorderedtags = exif.getAll();
                var tags = {};
                Object.keys(unorderedtags).sort().forEach(function(key) {
                  tags[key] = unorderedtags[key];
                });
                var table = this.$el.find('table').empty();
                var row = $('<tr></tr>');
                var cell = $('<td></td>');
                var prop;
                var exifTags = {};
                var rownumber = 0;
                for (prop in tags) {
                  if (tags.hasOwnProperty(prop)) {
                    if(prop in {"ExposureTime":'', "ShutterSpeedValue":'', 'BrightnessValue':''}) {
                        var numb = Number(tags[prop]);
                        tags[prop] = +numb.toFixed(4);
                    }
                    if(prop in {'ApertureValue':'', 'BrightnessValue':'', 'ExposureProgram':'', 'Make':'', 'Model':'',
                            'ShutterSpeedValue':'', 'FNumber':'', 'PhotographicSensitivity':'', 'FocalLength':'',
                            'FocalLengthIn35mmFilm':'', 'LensModel':'', 'Sharpness':'', 'ImageHeight':'',
                            'MeteringMode':'', 'WhiteBalance':'', 'Flash':'', 'ExposureTime':'', 'ImageUniqueID':'',
                            'ImageWidth':'', 'Orientation':'', 'DateTimeOriginal':''
                            } && (tags[prop] != "" || tags[prop] != "None") ) {
                            exifTags[prop] = tags[prop];
                            rownumber += 1;
                            var fullprop = prop.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
                            table.append(
                                row.clone().addClass(this.oddOrEven(rownumber))
                                    .append(cell.clone().text(fullprop))
                                    .append(cell.clone().text(tags[prop]))
                            );
                    }
                  }
                }
                DS.set('exifTags', exifTags);
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
                        var photoInputsView = new PhotoInputsView({model: s3FormModel, id: "inputs-view"}).render();
                        $('#inputs-target').html(photoInputsView.render().el);
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