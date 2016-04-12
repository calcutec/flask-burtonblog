define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            el: '#nav',
            events: {
                'change #element': 'filterOnSelect'
            },
            filterOnSelect: function(e) {
                e.preventDefault();
                var route = '/photos/' + $( "#element" ).val();
                console.log(route);
                window.location.href = route;
            }
        });
    }
);