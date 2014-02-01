GoogleBooks.Collections.MyBooksCollection = Backbone.Collection.extend({
    url:  '/books',

    model: GoogleBooks.Models.Book

});
