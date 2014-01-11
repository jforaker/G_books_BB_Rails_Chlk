GoogleBooks.Routers.Items = Backbone.Router.extend({
    routes: {
        "": "_setDefault",
        "#details/:id":"itemDetails"

    },

    _setDefault: function() {
        console.log("[setDefault]");
        //Backbone.history.navigate('books');
        this.index();
    },

    index: function() {
        console.log('Router > index');
        var items = new GoogleBooks.Collections.Items();
        //var deets = new GoogleBooks.Collections.DetailsCollection();
        new GoogleBooks.Views.ItemsIndex({
            collection: items
        });
        items.fetch({reset: true});
    },

    itemDetails:function (id) {
        console.log('item deets');

    },

    showView:function (selector, view) {
        if (this.currentView)
            this.currentView.close();
        $(selector).html(view.render().el);
        this.currentView = view;
        return view;
    }
});
