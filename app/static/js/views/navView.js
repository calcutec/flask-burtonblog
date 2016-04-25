define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            el: '#nav',
            render: function(category, entity, authenticated){
                $('nav', this.el).html('');
                var assets = {};
                assets['entity'] = entity;
                assets['category'] = category;
                var request = {};
                request['endpoint'] = entity;
                var current_user = {};
                current_user['is_authenticated'] = function(){
                    return authenticated;
                };
                $(this.el).html(window.env.render("nav_js.html",
                    {'assets': assets, 'request': request, 'current_user': current_user }));
            }
        });
    }
);