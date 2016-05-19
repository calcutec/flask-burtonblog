define(['backbone', 'models/commentModel'],
    function(Backbone, CommentModel){
        return Backbone.Collection.extend({
            url: "/comments/",
            model: CommentModel,

            initialize: function() {
                this.sort_order = 'desc';
            },

            /**
             * @param {{collection:string, authenticated:string}} response
             */
            parse: function(response){
                this.authenticated = response.authenticated;
                this.usernickname = response.usernickname;
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