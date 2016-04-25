define(['backbone', 'models/memberModel'],
    function(Backbone, MemberModel){
        return Backbone.Collection.extend({
            url: "/members",
            model: MemberModel,
            authenticated: null,

            /**
             * @param {{collection:string, authenticated:string}} response
             */
            parse: function(response){
                this.authenticated = response.authenticated;
                return response.collection;
            },

            comparator: function(member){
                return member.get('timestamp');
            }
        });
    }
);