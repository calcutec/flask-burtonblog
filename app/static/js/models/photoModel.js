define(['underscore', 'backbone'],
    function(_, Backbone) {
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

        parse: function(response, xhr){
            if(xhr.patch){
                if (_.isObject(response.photo)) {
                    return response.photo;
                } else if (_.isObject(response.comment)) {
                    return {};
                }

            } else if (xhr.type == "POST") {
                return response.uploadForm;
            } else {
                return response;
            }
        },

        validate: function(attrs){
            if (!attrs.body){
                alert('Your forgot to say why this photo is great..');
            }
        }
    });
});