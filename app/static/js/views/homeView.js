define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            
            events: {
                'click .expand-one':   'expandInfoBox',
            },

            expandInfoBox: function(e) {
                e.preventDefault();
                $('.content-one').slideToggle('slow');
            },
            
            render: function() {
                $(this.el).html(window.env.render("home_page.html"));
                return this;
            }
        });
    }
);