define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/photos/",
        defaults: {
            id: '',
            photoid: '',
            author: '',
            nickname: '',
            header: '',
            body: '',
            photo: '',
            category: '',
            comments: '',
            timestamp: ''
        },

        parse: function(response){
            return response;
        },
        
        validate: function(attrs){
            if (!attrs.body){
                alert('Your forgot to say why this photo is great..');
            }
        }
    });
});