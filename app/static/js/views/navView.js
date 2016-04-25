define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            el: '#nav',
            render: function(filteredcollection, category, entity, authenticated, counts){
                $('nav', this.el).html('');
                var assets = {};

                // var categoryarray = [];
                // filteredcollection.forEach(function(model){
                //     categoryarray.push(model.get('category'))
                // });
                //
                // var counts = {};
                // for(var i = 0; i < categoryarray.length; ++i) {
                //     if(!counts[categoryarray[i]])
                //         counts[categoryarray[i]] = 0;
                //     ++counts[categoryarray[i]];
                // }
                //
                assets['category_counts'] = counts;
                assets['entity'] = entity;
                assets['category'] = category;
                var request = {};
                request['endpoint'] = entity;
                var current_user = {};
                current_user['is_authenticated'] = function(){
                    return authenticated;
                };
                $(this.el).html(window.env.render("nav.html",
                    {'assets': assets, 'request': request, 'current_user': current_user }));
            }
        });
    }
);