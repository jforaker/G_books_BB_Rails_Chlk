GoogleBooks.Views.Topics = Backbone.View.extend({

    el : 'UL#dropper', //list item that controls the books in the #all-wants div

    tagName: 'li',
    template: JST['topics'],
    events : {
        'click a' : 'click_handler'
    },

    initialize: function() {
        this.collection = new GoogleBooks.Collections.Items();
        this.listenTo(this.collection, 'reset', this.render);
        return this.listenTo(this.collection, 'add', this.addBook);
    },

    render : function() {
        //$('body').find('.rower').hide();
       // $('body').find('.bookshelf').html('');

        $(this.$el).show();
        $(this.el).html(this.template({
            Art: 'Art',
            History: 'History',
            Drama: 'Drama',
            Science: 'Science',
            Biography: 'Biography',
            Classics: 'Classics',
            Poetry: 'Poetry'
        }));
        return this;
    },

    query: function(val){
        var items = new GoogleBooks.Collections.Items();
        var view = new GoogleBooks.Views.ItemsIndex({
            collection: items
        });
        view.queryApi(val, 0, 10, 'query')
    },

    click_handler: function(e) {
        var name = e.target.className;
        this.query(name);
        $('.rower').find('#all-wants').hide();

    } ,

    addBook : function(book) {
        var bookView = new GoogleBooks.Views.Book({
            model: book
        });
        var bookEl = bookView.render().el ;
        $(bookEl).attr("data-something", "from-search");
        $('.bookshelf').append(bookEl);
        $('ui-autocomplete').hide();
        return this;
    }
});
