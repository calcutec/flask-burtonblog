define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        url: "/photos/",
        defaults: {
            photoid: '',
            author: '',
            header: '',
            body: '',
            photo: '',
            timestamp: ''
        },
        validate: function(attrs){
            if (!attrs.body){
                alert('Your forgot to say why this photo is great..');
            }
        }
    });
});