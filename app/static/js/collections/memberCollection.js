define(['backbone', 'models/memberModel'],
    function(Backbone, MemberModel){
        return Backbone.Collection.extend({
            url: "/members",
            model: MemberModel,

            /**
             * @param {{collection:string}} response
             */
            parse: function(response){
                return response.collection
            },

            comparator: function(member){
                return member.get('timestamp');
            }
        });
    }
);