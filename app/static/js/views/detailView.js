define(['jquery', 'backbone', 'underscore', 'ds', 'views/appView', 'views/tabsView'],
    function($, Backbone, _, DS, AppView, TabsView){
        return Backbone.View.extend({
            events: {
                'click #deletephoto':   'deletephoto',
                'click .vote':   'vote',
                'click .unvote':   'vote',
                'click':    'showbuttons'
            },

            showbuttons: function(e) {
                e.preventDefault();
                this.$el.find('span.text-content').toggle();
                this.$el.find('li').toggleClass("click");
            },
            
            initialize: function() {
                DS.set('initialchange', true);
                this.model.on("change:has_voted", this.updateLike, this);
                this.model.on("change:votes", this.updateCount, this);
            },

            deletephoto: function() {
                var self = this;
                this.model.destroy({
                      success: function(){
                            self.remove();
                            $( ".fa-picture-o" ).trigger( "click" );
                      },
                      error: function(response){
                        console.log(response);
                      }
                });
            },

            vote: function(e) {
                e.preventDefault();
                if (this.model.get('has_voted') == true){
                    this.model.set({has_voted: false});
                } else {
                    this.model.set({has_voted: true});
                }

                var self = this;
                this.model.save(this.model.changedAttributes(), {
                    patch: true,
                    wait:true,
                    success: function() {
                        var changeddata = {'id': self.model.id, 'votes': self.model.get('votes')};
                        window.socket.emit('my broadcast event', {data: changeddata});
                        return false;

                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },

            render: function() {
                this.renderMainView();
                this.renderTabView();
                new MediumEditor('.editable', {
                    delay: 0,
                    toolbar: {
                        buttons: ['bold', 'italic', 'underline', 'h4', 'h5']
                    }
                });
                $('.editable').bind('input propertychange', function() {
                    window.micropost = $(this).html();
                    if (DS.get('initialchange') === true){
                        $('#updatestory').toggleClass('hide');
                        $('#comment-form-prompt').toggleClass('hide');
                        DS.set('initialchange', false);
                    }
                });
                return this;
            },
            
            renderTabView: function() {
                var tabsView = new TabsView({id: 'links', className: 'item-list', model: this.model, collection:_.clone(this.model.get("comments"))});
                AppView(tabsView);
                return this;
            },

            renderMainView: function() {
                var post = this.model.toJSON();
                post['author'] = { "nickname": post.nickname };
                var votestatus = post.has_voted;
                post['has_voted'] = function(){
                    return votestatus
                };
                $(this.el).html(window.env.render("photo_detail.html", {'post': post, 'momentjs': moment }));
                return this;
            },

            updateLike: function() {
                if (this.model.get('has_voted') === true) {
                    this.$el.find('.fa-meh-o').addClass('fa-smile-o').removeClass('fa-meh-o');
                } else {
                    this.$el.find('.fa-smile-o').addClass('fa-meh-o').removeClass('fa-smile-o');
                }
            },

            updateCount: function() {
                this.$el.find( "span#votes" ).html(window.env.render("votes.html", {'post': {'votes': this.model.get('votes')}}));
            }

        });
    }
);