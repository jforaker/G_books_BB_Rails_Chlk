GoogleBooks.Collections.TemporaryCollection = Backbone.Collection.extend({
    url:  '/temps',

    model: GoogleBooks.Models.Book

});
