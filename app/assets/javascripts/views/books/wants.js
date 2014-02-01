GoogleBooks.Views.Wants = Backbone.View.extend({
    el : '#all-wants',

    initialize : function() {
        _.bindAll(this, "render");
        Backbone.history.navigate('/myBooks');
    },

    render : function() {

        var that = this,
            oldCollections = this.collection,
            results = oldCollections.where({
                wantToRead: true
            }),
            filteredCollection = new GoogleBooks.Collections.MyBooksCollection(results),
            $myBookElements = $('#all-wants').find('.book-holder');

        if (filteredCollection.length > $myBookElements.length){

            filteredCollection.each(function(book) {
                var bookView = new GoogleBooks.Views.Book({
                    model: book
                });
                $(that.el).append(bookView.render().$el);
                console.log(bookView);
                return this;
            });
        }
    }
});