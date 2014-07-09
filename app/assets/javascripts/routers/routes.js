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

        var that = this;
        console.log("[setDefault]");
        //Backbone.history.navigate('home');



        var url = $.url();
        var mode = url.data.param.query.mode;

        console.info(url.data.param.query);
        CHLK_ANN_ID =  url.data.param.query.announcementapplicationid;



        switch (mode){
            case  "myview":
                console.log('my view ===');
                CHLK_MODE = null;
                break;
            case "edit":
                console.info('edit =====');
                console.info(CHLK_ANN_ID);
                CHLK_MODE = true;

                break;
            case "gradingview":
                console.info('grading view ======');
                CHLK_MODE = null;

                $.ajax({
                    url: '/announcements/' + CHLK_ANN_ID + '.json',
                    dataType: 'json',
                    data: {
                        announcementapplicationid : CHLK_ANN_ID
                    },
                    success: function (data) {
                        console.info(data)
                        if (!data) this.failure(data)
                        var g_books_id = data.g_books_id;

                        that.showAttached(g_books_id)
                    },
                    failure: function(data){
                        console.log('get announcemment fail ')
                    }
                });
                break;

            case "view":
                console.info('view ======');
                CHLK_MODE = "view";
                break;

            //TODO -- come back to VIEW when it is fixed
        }




        that.index();

    },

    showAttached: function(id){
        var detailsView = new GoogleBooks.Views.Details({
            model: new Backbone.Model({
                id: id
            })
        });
        console.log(detailsView);
        detailsView.initialize();

        return  detailsView.render(id);
    },


    index: function() {
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
        console.log('topics clicked');
//        var topicsView = new GoogleBooks.Views.Topics();
//        topicsView.render();
    }

});
