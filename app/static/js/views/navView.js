define(['jquery', 'backbone'],
    function($, Backbone){
        return Backbone.View.extend({
            el: '#nav',
            events: {
                'change #element': 'filterOnSelect'
            },
            filterOnSelect: function(e) {
                e.preventDefault();
                if (window.location.pathname.split("/")[1] == "photos"){
                    var route = '/photos/' + $( "#element" ).val();
                } else if (window.location.pathname.split("/")[1] == "members"){
                    if (window.location.pathname.split("/")[2].match("all|latest") ||
                        window.location.pathname.split("/")[2] == ""){
                        var route = '/members/' + $( "#element" ).val();
                    } else {
                        var route = '/members/' + window.location.pathname.split("/")[2] + "/" + $( "#element" ).val();
                    }
                }
                console.log(route);
                window.location.href = route;
            }
        });
    }
);