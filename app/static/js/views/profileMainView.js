define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            
            events: {
                'click .follow':   'followuser',
                'click .unfollow':   'unfollowuser',
                // 'click #update-info':   'updateInfo',
                'change #file-input': 'validateanddisplaysample'
            },

            initialize: function() {
                this.listenTo(this.model, 'change', this.render, this);
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
                var options = {
                  canvas: true,
                  pixelRatio: window.devicePixelRatio,
                  downsamplingRatio: 0.5
                };
                var self = this;
                window.loadImage(
                   nowCurrentFile,
                   function (img) {
                       if(img.type === "error") {
                           return false;
                       } else {
                           window.loadImage.parseMetaData(nowCurrentFile, function (data) {
                               if (data.exif) {
                                   options.orientation = data.exif[0x0112];
                                   self.displayExifData(data.exif);
                                   self.createContent(img)
                               } else {
                                   alert('Please choose an image with exif data intact')
                               }
                           });
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

            unfollowuser: function(e) {
                e.preventDefault();
                this.model.set({is_following: false});
                var self = this;
                this.model.save(this.model.changedAttributes(), {
                    patch: true,
                    wait:true,
                    success: function() {
                        var changeddata = {'id': self.model.id, 'followers': self.model.get('followers')};
                        window.socket.emit('my broadcast event', {data: changeddata});
                        return false;
                        
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },

            followuser: function(e) {
                e.preventDefault();
                this.model.set({is_following: true});
                var self = this;
                this.model.save(this.model.changedAttributes(), {
                    patch: true,
                    wait:true,
                    success: function() {
                        var changeddata = {'id': self.model.id, 'followers': self.model.get('followers')};
                        window.socket.emit('my broadcast event', {data: changeddata});
                        return false;
                        
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },
            
            detailLink: function(e) {
                e.preventDefault();
                console.log('detail link clicked');
            },
        
            render: function() {
                var post = this.model.toJSON();
                post['author'] = { "nickname": post.nickname };
                var currentfollowers = post.followers;
                var currentfollowed = post.followed;
                post['followers'] = { "count": function(){ return currentfollowers } };
                post['followed'] = { "count": function(){ return currentfollowed } };
                var g = {};
                g.user = {};
                g.user['is_following'] = function(){
                    return post.is_following;
                };
                this.$el.html('');
                this.$el.html(window.env.render("person.html", {'post': post, 'g': g, 'momentjs': moment }));

                return this;
            }
        });
    }
);