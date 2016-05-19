define(['backbone', 'models/memberModel'],
    function(Backbone, MemberModel){
        return Backbone.Collection.extend({
            url: "/members/",
            model: MemberModel,
            authenticated: null,

            /**
             * @param {{collection:string, authenticated:string, usernickname:string, userid:string}} response
             */
            parse: function(response){
                this.authenticated = response.authenticated;
                this.usernickname = response.usernickname;
                this.userid = response.userid;
                return response.collection;
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