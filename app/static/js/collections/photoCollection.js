define(['backbone', 'localstorage', 'models/photoModel'],
    function(Backbone, LocalStorage, PhotoModel){
        return Backbone.Collection.extend({
            url: "/photos",
            model: PhotoModel,

            localStorage: new Backbone.LocalStorage("photos"),

            refreshFromServer : function(options) {
                return Backbone.ajaxSync('read', this, options);
            },

            /**
             * @param {{myPhotos:string}} response
             */
            parse: function(response){
                return response.myPhotos
            },
            
            comparator: function(photo){
                return photo.get('timestamp');
            }
        });
    }
);