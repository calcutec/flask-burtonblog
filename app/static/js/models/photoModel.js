define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        url: "/photos/",
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
        validate: function(attrs){
            if (!attrs.body){
                alert('Your forgot to say why this photo is great..');
            }
        }
    });
});