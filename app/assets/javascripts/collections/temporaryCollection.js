GoogleBooks.Collections.TemporaryCollection = Backbone.Collection.extend({
    url:  '/books',

    model: GoogleBooks.Models.Book

});
