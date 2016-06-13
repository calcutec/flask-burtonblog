define(['jquery', 'backbone', 'ds'],
    function($, Backbone, DS){
        return Backbone.View.extend({

            events: {
                'click .fa-picture-o': 'alertClick'
            },

            alertClick: function(e) {
                e.preventDefault();
                alert('pictureclicked');
            },

            render: function(){
                var assets = {};
                assets['category_counts'] = DS.get('counts');
                assets['category'] = DS.get('category');
                assets['photo_id'] = DS.get('postId');
                assets['entity'] = DS.get('entity');
                var current_user = {};
                current_user['nickname'] = DS.get('nickname');
                current_user['is_authenticated'] = function(){
                    return DS.get('authenticated');
                };
                $(this.el).html(window.env.render("nav.html", { 'assets': assets, 'current_user': current_user }));
                return this;
            }
        });
    }
);