GoogleBooks.Views.MyLibrary = Backbone.View.extend({
    el : '.bookshelf',

    initialize : function() {
        _.bindAll(this, "render");
        Backbone.history.navigate('/myBooks');
        $('.bookshelf').html('');

    },

    render : function() {
        $('body').find('#topics').hide();
        $(this.$el).show();
        console.log('WANTSS');
        var that = this,
            oldCollections = this.collection,
            results = oldCollections.where({
                wantToRead: true
            }),
            filteredCollection = new GoogleBooks.Collections.MyBooksCollection(results),
            $myBookElements = $('#all-wants').find('.book-holder');

        console.log(filteredCollection.length);

        if (filteredCollection.length == 0 ){
            $(that.$el.html(''));
            var row = $('<div class="rowerg"></div> ');
            $(that.$el.append(row));
            row.html("No books in your Library. Search for a book and add it!");
        } else {
            filteredCollection.each(function(book) {
                var bookView = new GoogleBooks.Views.Book({
                    model: book
                });
                $(that.el).append(bookView.render().el);
                console.log(bookView);
                return this;
            });
        }

    }

});