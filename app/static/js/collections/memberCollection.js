define(['backbone', 'localstorage', 'models/memberModel'],
    function(Backbone, LocalStorage, MemberModel){
        return Backbone.Collection.extend({
            url: "/members",
            model: MemberModel,

            localStorage: new LocalStorage("members"),

            refreshFromServer: function(options) {
                return Backbone.ajaxSync('read', this, options);
            },

            /**
             * @param {{Members:string}} response
             */
            parse: function(response){
                return response.Members
            },

            comparator: function(member){
                return member.get('timestamp');
            }
        });
    }
);