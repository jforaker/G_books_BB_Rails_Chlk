GoogleBooks.Views.Wants = Backbone.View.extend({
    el : '.bookshelf',

    initialize : function() {
        _.bindAll(this, "render");
        Backbone.history.navigate('/myBooks');
        $('.bookshelf').html('');

    },

    render : function() {


        console.log('WANTSS')
        var that = this,
            oldCollections = this.collection,
            results = oldCollections.where({
                wantToRead: true
            }),
            filteredCollection = new GoogleBooks.Collections.MyBooksCollection(results),
            $myBookElements = $('#all-wants').find('.book-holder');

        filteredCollection.each(function(book) {
            var bookView = new GoogleBooks.Views.Book({
                model: book
            });
            $(that.el).append(bookView.render().el);
            console.log(bookView);
            return this;
        });

//        if (filteredCollection.length > $myBookElements.length){
//
//            filteredCollection.each(function(book) {
//                var bookView = new GoogleBooks.Views.Book({
//                    model: book
//                });
//                $(that.el).append(bookView.render().$el);
//                console.log(bookView);
//                return this;
//            });
//        }
    }

});