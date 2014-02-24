GoogleBooks.Views.Want = Backbone.View.extend({

    el : '#myBooks', //list item that controls the books in the #all-wants div

    template : JST['books/want'],

    events:{
        'click #removeAll' : 'removeAll',
        'click #showAllWants' : 'showMyBooks'
    },

    initialize : function() {
        return this.listenTo(this.collection, 'all', this.render);
    },

    render : function() {

        var wants = this.collection,
            wantsArr = [],
            getWants = wants.where({ wantToRead: true });

        wantsArr.push(getWants);
        var totalWants = wantsArr[0].length || '';

        $(this.el).html(this.template({
            wantToRead: totalWants
        }));

        return this;
    },

    removeAll: function(){
        _.invoke(this.collection.toArray(), 'destroy');
    },

    showMyBooks: function(){
        //TODO fix this

        var $booksFromSearch = $('.bookshelf'),
            $myBooksView = $('#all-wants');

        $booksFromSearch.fadeOut('fast');
        $myBooksView.show();

        var wantsView = new GoogleBooks.Views.Wants({
            collection: this.collection
        });

        wantsView.render();
    }
});