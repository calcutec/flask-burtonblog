define(['backbone', 'models/photoModel'],
    function(Backbone, PhotoModel){
        return Backbone.Collection.extend({
            url: "/photos/",
            model: PhotoModel,

            /**
             * @param {{collection:string, authenticated:string}} response
             */
            parse: function(response){
                this.authenticated = response.authenticated;
                return response.collection
            },
            
            comparator: function(photo){
                return -photo.get('timestamp');
            }
        });
    }
);