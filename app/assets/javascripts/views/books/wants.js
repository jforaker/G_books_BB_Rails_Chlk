GoogleBooks.Views.Wants = Backbone.View.extend({
    el : '#all-wants',

   // template : JST['books/wants'],

    initialize : function() {
        _.bindAll(this, "render");
        //Backbone.history.navigate('/wants/');
    },

    render : function() {
        var that = this;
        var oldCollections = this.collection;
        $('#wantsModal').modal('show');


        var results = oldCollections.where({
            wantToRead: true
        });

        var filteredCollection = new Backbone.Collection(results);

        filteredCollection.each(function(item) {
            var itemview;

            //TODO -- create new view with new filtered collection
            //now it just remakes an item view

            itemview = new GoogleBooks.Views.Book({
                model: item
            });

            $(that.el).append(itemview.render().$el);

            console.log(itemview);
            return this;

        });
    }
});