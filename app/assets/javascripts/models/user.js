GoogleBooks.Models.User = Backbone.Model.extend({
    defaults: {
        name : 'asdf'
    },

    _init: function () {
        console.log(this);
        return this.attributes.name
    }
});
