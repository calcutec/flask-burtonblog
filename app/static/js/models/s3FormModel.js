define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        urlRoot: "/photos/upload",

        parse: function(response){
            return response.uploadForm;
        }
    });
});