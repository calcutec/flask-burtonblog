define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            events: {
                'click #deletephoto':   'deletephoto'
            },

            deletephoto: function() {
                var self = this;
                this.model.destroy({
                      success: function(response){
                            self.remove();
                            $( ".fa-picture-o" ).trigger( "click" );
                      },
                      error: function(response){
                        console.log(response);
                      }
                });
            },

            render: function() {
                var post = this.model.toJSON();
                post['author'] = { "nickname": post.nickname };
                $(this.el).html(window.env.render("photo_detail.html", {'post': post, 'momentjs': moment }));
                return this;
            }
        });
    }
);