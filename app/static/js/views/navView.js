define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            el: '#nav',
            render: function(filteredcollection, category, entity, nickname, authenticated, counts){
                $('nav', this.el).html('');
                var assets = {};
                assets['category_counts'] = counts;
                assets['entity'] = entity;
                assets['category'] = category;
                var request = {};
                request['endpoint'] = entity;
                var current_user = {};
                current_user['is_authenticated'] = function(){
                    return authenticated;
                };
                current_user['nickname'] = nickname
                $(this.el).html(window.env.render("nav.html",
                    {'assets': assets, 'request': request, 'current_user': current_user }));
            }
        });
    }
);