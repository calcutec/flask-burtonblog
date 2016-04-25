define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/members/",

        defaults: {
            memberid: '', 
            id: '',
            type: '',
            firstName: '',
            lastName: '',
            nickname: '',
            photo: '',
            lastseen: '',
            followed: '',
            authenticated: '',
        }
    });
});