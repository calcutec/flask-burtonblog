define(['jquery', 'backbone', 'ds', 'views/photoTextFormView'],
    function($, Backbone, DS, PhotoTextFormView){
        return Backbone.View.extend({

            events: {
                'click #photo-submit': 'submitPhoto'
            },

            submitPhoto: function(e) {
                e.preventDefault();
                var fd = new FormData();
                window.uploadedfilename = 'user-images/' + DS.get('userid') + "/" + (new Date).getTime() + '-' + window.currentFile.name;
                window.amazons3path = 'static/user-images/' + DS.get('userid') + "/" + (new Date).getTime() + '-' + window.currentFile.name;
                fd.append('key', window.amazons3path);
                fd.append('acl', this.model.get('acl'));
                fd.append('policy', this.model.get('policy'));
                fd.append('success_action_status', this.model.get('success_action_status'));
                fd.append('x-amz-algorithm', this.model.get('x-amz-algorithm'));
                fd.append('x-amz-credential', this.model.get('x-amz-credential'));
                fd.append('x-amz-date', this.model.get('x-amz-date'));
                fd.append('x-amz-signature',this.model.get('x-amz-signature'));
                if (typeof(window.serverBlob) !== "undefined") {
                    fd.append('file', window.serverBlob);
                } else {
                    fd.append('file', window.currentFile);
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
                            self.remove();
                            var photoTextFormView = new PhotoTextFormView({id: "text-form-view"});
                            $('#inputs-target').html(photoTextFormView.el)
                        } else {
                            console.log(xhr.statusText);
                        }

                    }
                };
                xhr.open('POST', 'https://aperturus.s3.amazonaws.com/', true);
                xhr.send(fd);
            },

            render: function(){
                $(this.el).html(window.env.render("photo_inputs.html"));
                return this;
            }
        });
    }
);