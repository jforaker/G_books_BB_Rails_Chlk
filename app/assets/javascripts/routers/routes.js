GoogleBooks.Routers.AppRouter = Backbone.Router.extend({

    routes: {
        "": "_setDefault",
        "home": "_setDefault",
        //"details/:id":"itemDetails",
        "myBooks": "getMyBooks",
        "search" : "search",
        "topics" : "topics"
    },

    _setDefault: function() {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        console.log("[setDefault]");
        //Backbone.history.navigate('home');

        CHLK_USER = {};


        $.ajax({
            url: '/books.json',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                CHLK_USER.name = data.user;
            }
        });

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

    getMyBooks: function(){
        var myBooksView = new GoogleBooks.Views.Wants();
        myBooksView.render();
    },

    removeAll: function(){
        Backbone.history.navigate('home');
    },

    search: function(){
        var items = new GoogleBooks.Collections.Items();
        new GoogleBooks.Views.ItemsIndex({
            collection: items
        });
        items.fetch({reset: true});

    },

    itemDetails:function (id) {
        console.log('item deets');
    },

    topics: function(){
        var topicsView = new GoogleBooks.Views.Topics();
        topicsView.render();
    }

});
