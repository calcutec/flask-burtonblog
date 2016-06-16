define(['jquery', 'backbone', 'ds', 'views/photoTextFormView'],
    function($, Backbone, DS, PhotoTextFormView){
        return Backbone.View.extend({

            events: {
                'click #photo-submit': 'submitPhoto'
            },

            submitPhoto: function(e) {
                e.preventDefault();
                var fd = new FormData();
                var currentTime = (new Date).getTime()
                if (DS.get('route') == '/members/upload') {
                    DS.set('uploadedfilename', 'user-images/' + DS.get('userid') + "/profile_image/" + currentTime + '-' + DS.get('currentFile').name);
                    DS.set('amazons3path', 'static/user-images/' + DS.get('userid') + "/profile_image/" + currentTime + '-' + DS.get('currentFile').name);
                } else {
                    DS.set('uploadedfilename', 'user-images/' + DS.get('userid') + "/" + currentTime + '-' + DS.get('currentFile').name);
                    DS.set('amazons3path', 'static/user-images/' + DS.get('userid') + "/" + currentTime + '-' + DS.get('currentFile').name);
                }
                fd.append('key', DS.get('amazons3path'));
                fd.append('acl', this.model.get('acl'));
                fd.append('policy', this.model.get('policy'));
                fd.append('success_action_status', this.model.get('success_action_status'));
                fd.append('x-amz-algorithm', this.model.get('x-amz-algorithm'));
                fd.append('x-amz-credential', this.model.get('x-amz-credential'));
                fd.append('x-amz-date', this.model.get('x-amz-date'));
                fd.append('x-amz-signature',this.model.get('x-amz-signature'));
                if (DS.get('serverBlob') !== null) {
                    fd.append('file', DS.get('serverBlob'));
                } else {
                    fd.append('file', DS.get('currentFile'));
                }

                /**
                 * @param {{total:string}} e
                 */
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener('progress',function(e){
                    $( "#progress-bar").html(e.loaded+" of "+e.total);
                }, false);

                var self=this;
                xhr.onreadystatechange = function(){
                    if(xhr.readyState == 4){
                        if(xhr.status == 200){
                            self.model.destroy();
                            self.remove();
                            if (DS.get('route') == '/members/upload') {
                                var targetUserModel = DS.get('target_user');
                                targetUserModel.set({photo: DS.get('uploadedfilename')});
                                targetUserModel.save(targetUserModel.changedAttributes(), {
                                    patch: true,
                                    wait:true,
                                    success: function() {
                                        $( ".fa-briefcase" ).trigger( "click" );
                                    },
                                    fail: function(error) {
                                        console.log(error);
                                    }
                                });
                            } else {
                                var photoTextFormView = new PhotoTextFormView({id: "text-form-view"});
                                $('#inputs-target').html(photoTextFormView.el)
                            }
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