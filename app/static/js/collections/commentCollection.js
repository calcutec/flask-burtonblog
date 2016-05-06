define(['backbone', 'models/commentModel'],
    function(Backbone, CommentModel){
        return Backbone.Collection.extend({
            url: "/comments/",
            model: CommentModel,

            /**
             * @param {{collection:string, authenticated:string}} response
             */
            parse: function(response){
                this.authenticated = response.authenticated;
                this.usernickname = response.usernickname;
                return response.collection
            },
            
            comparator: function(comment){
                return -comment.get('timestamp');
            }
        });
    }
);