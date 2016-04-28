define(['backbone', 'models/memberModel'],
    function(Backbone, MemberModel){
        return Backbone.Collection.extend({
            url: "/members",
            model: MemberModel,
            authenticated: null,

            /**
             * @param {{collection:string, authenticated:string, usernickname:string}} response
             */
            parse: function(response){
                this.authenticated = response.authenticated;
                this.usernickname = response.usernickname;
                return response.collection;
            },

            comparator: function(member){
                return -member.get('lastseen');
            }
        });
    }
);