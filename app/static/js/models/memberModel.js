define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        url: "/members/",
        defaults: {
            memberid: '',
            type: '',
            firstName: '',
            lastName: '',
            nickname: '',
            photo: '',
            lastseen: ''
        }
    });
});