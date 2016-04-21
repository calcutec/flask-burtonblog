define(['jquery', 'backbone', 'views/dataStore', 'collections/photoCollection'],
    function($, Backbone, DataStore, PhotoCollection){
        return Backbone.View.extend({
            el: '#nav',
            events: {
                // 'change #element': 'filterOnSelect'
            },
            filterOnSelect: function(e) {
                e.preventDefault();
                var category = $( "#element" ).val();
                var route;
                if (window.location.pathname.split("/")[1] == "photos"){
                    route = '/photos/' + category;
                    Backbone.history.navigate(route, {trigger: true});
                    this.filterPhotos(category)
                } else if (window.location.pathname.split("/")[1] == "members"){
                    if (window.location.pathname.split("/")[2].match("all|latest") ||
                        window.location.pathname.split("/")[2] == ""){
                        route = '/members/' + category;
                    } else {
                        route = '/members/' + window.location.pathname.split("/")[2] + "/" + category;
                    }
                    console.log(route);
                    window.location.href = route;
                }
            },
            filterPhotos: function(category) {
                var filteredPhotos = DataStore.photoCollection.where({category: category});
                DataStore.filteredPhotoCollection.reset()
                DataStore.filteredPhotoCollection.set(filteredPhotos);
                DataStore.baseView.removeViews();
                DataStore.baseView.renderViews();
                var test = 'test';
            }
        });
    }
);