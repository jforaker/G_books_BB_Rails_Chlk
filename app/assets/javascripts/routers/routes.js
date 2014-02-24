GoogleBooks.Routers.AppRouter = Backbone.Router.extend({

    routes: {
        "": "_setDefault",
        "home": "_setDefault",
        "details/*":"itemDetails",
        "getMyBooks": "getMyBooks",
        "search" : "search"
    },

    _setDefault: function() {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('#deetsModal').remove();
        console.log("[setDefault]");
        //Backbone.history.navigate('home');
        this.index();
    },

    index: function() {
        console.log('Router > index');
        CHLK_USER = {};

        $.ajax({
            url: '/index.json',
            dataType: 'json',
            success: function (data) {
                CHLK_USER.name = data.user;
                console.log(CHLK_USER);
            }
        });

        var items = new GoogleBooks.Collections.Items();
        new GoogleBooks.Views.ItemsIndex({
            collection: items
        });
        items.fetch({reset: true});
    },

    getMyBooks: function(){
        var myBooksView = new GoogleBooks.Views.Want();
        myBooksView.showMyBooks();
    },

    removeAll: function(){
        Backbone.history.navigate('home');
    },

    search: function(){
        var indexView = new GoogleBooks.Views.ItemsIndex().initialize();
        indexView.render();
    },

    itemDetails:function (id) {
        console.log('item deets');
    }

});
