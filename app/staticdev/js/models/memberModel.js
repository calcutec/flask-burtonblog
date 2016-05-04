define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/members/",

        parse: function(response, xhr){
            if(xhr.patch){
                return response.user;
            } else {
                return response;
            }
        },

        defaults: {
            memberid: '', 
            id: '',
            type: '',
            firstName: '',
            lastName: '',
            nickname: '',
            photo: '',
            lastseen: '',
            about_me: '',
            followed: '',
            is_following: ''
        }
    });
});