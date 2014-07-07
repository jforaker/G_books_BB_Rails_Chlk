GoogleBooks.Views.MyLibrary = Backbone.View.extend({
    el : '.bookshelf',
    tagName: 'li',
    initialize : function() {
        _.bindAll(this, "render");
    },

    render : function() {
      //  $('body').find('#topics').hide();
        $(this.$el).show();
        console.log('WANTSS');
        var that = this, res = this.collection;

        console.log(res.length);

        if (res.length == 0 ){
            $(that.$el.html(''));
            var row = $('<div class="rowerg"></div> ');
            $(that.$el.append(row));
            row.html("No books in your Library. Search for a book and add it!");
        } else {
            res.each(function(book) {
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