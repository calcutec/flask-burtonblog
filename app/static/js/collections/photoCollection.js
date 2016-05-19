define(['backbone', 'models/photoModel'],
    function(Backbone, PhotoModel){
        return Backbone.Collection.extend({
            url: "/photos/",
            model: PhotoModel,

            initialize: function() {
                this.sort_order = 'asc';
            },

            /**
             * @param {{collection:string, authenticated:string}} response
             */
            parse: function(response){
                this.authenticated = response.authenticated;
                this.usernickname = response.usernickname;
                this.userid = response.userid;
                return response.collection
            },
            
            sort_key: 'id', // default sort key

            comparator: function(item) {
                return !item.get(this.sort_key);
            },

            sortByField: function(fieldName) {
                this.sort_key = fieldName;
                this.sort();
            }
        });
    }
);