GoogleBooks.Routers.Items = Backbone.Router.extend({
//    routes: {
//        "": "_setDefault",
//        "#details/:id":"itemDetails"
//
//    },
//
//    _setDefault: function() {
//        console.log("[setDefault]");
//        //Backbone.history.navigate('books');
//        this.index();
//    },
//
//    index: function() {
//        console.log('Router > index');
//        var items = new GoogleBooks.Collections.Items();
//        //var deets = new GoogleBooks.Collections.DetailsCollection();
//        new GoogleBooks.Views.ItemsIndex({
//            collection: items
//        });
//        items.fetch({reset: true});
//    },
//
//    itemDetails:function (id) {
//        console.log('item deets');
//
//    },
//
//    showView:function (selector, view) {
//        if (this.currentView)
//            this.currentView.close();
//        $(selector).html(view.render().el);
//        this.currentView = view;
//        return view;
//    }

    routes: {
        "": "_setDefault",
        "#details/:id":"itemDetails",
        "lorem": "lorem",
        "at": "at",
        "duis": "duis",
        "*else": "notFound"

    },

    _setDefault: function() {
        console.log("[setDefault]");
        //Backbone.history.navigate('books');
        this.index();
    },

    index: function() {
        console.log('Router > index');
        var items = new GoogleBooks.Collections.Items();
        new GoogleBooks.Views.ItemsIndex({
            collection: items
        });
        items.fetch({reset: true});
    },

//    initialize: function(el) {
//        this.el = el;
////        this.atView = new ContentView({template: '#at'});
////        this.duisView = new ContentView({template: '#duis'});
////        this.notFoundView = new ContentView({template: '#not-found'});
//    },
//
//
//
//    currentView: null,
//
//    switchView: function(view) {
//        if (this.currentView) {
//            // Detach the old view
//            this.currentView.remove();
//        }
//
//        // Move the view element into the DOM (replacing the old content)
//        this.el.html(view.el);
//
//        // Render view after it is in the DOM (styles are applied)
//        view.render();
//
//        this.currentView = view;
//    },
//
//    /*
//     * Change the active element in the topbar
//     */
//    setActiveEntry: function(url) {
//        // Unmark all entries
//        $('li').removeClass('active');
//
//        // Mark active entry
//        $("li a[href='" + url + "']").parents('li').addClass('active');
//    },
//
//    lorem: function() {
//        this.switchView(this.loremView);
//        this.setActiveEntry('#lorem');
//    },
//
//    at: function() {
//        this.switchView(this.atView);
//        this.setActiveEntry('#at');
//    },
//
//    duis: function() {
//        this.switchView(this.duisView);
//        this.setActiveEntry('#duis');
//    },
//
//    notFound: function() {
//        this.switchView(this.notFoundView);
//    }
});
