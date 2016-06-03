define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            tagName: "ul",
            render: function() {
                var comment = this.model.toJSON();
                $(this.el).html(window.env.render("comment.html", {'comment': comment, 'momentjs': moment}));
                return this;
            },
            unrender: function() {
                console.log('Consider me unrendered');
            }
        });
    }
);