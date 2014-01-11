GoogleBooks.Views.ItemsIndex = Backbone.View.extend({

    template: JST['books/index'],
    el: "#app",
    events : {
        'keypress #add-item': 'createOnEnter'
    },

    initialize : function() {
        this.listenTo(this.collection, 'reset', this.render);
        return this.listenTo(this.collection, 'add', this.addItem);
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('#deetsModal').remove();

    },

    render : function() {
        var container, countView,
            _this = this;
        $(this.el).html(this.template());

        var countView = new GoogleBooks.Views.Count({
            collection: this.collection
        });
        countView.render();

        var wantView = new GoogleBooks.Views.Want({
            collection: this.collection
        });

        wantView.render();

        this.collection.each(function(item) {
            var itemview;
            itemview = new GoogleBooks.Views.Book({
                model: item
            });
            var row = itemview.render().el;
            this.$('.row').append(row);
            return this;

        });
    },
    createOnEnter : function(event) {
        if (event.keyCode !== 13) {
            return;
        }

        var query = this.$('#add-item').val();

        this.search(event);
        //this.searchGBooks(query);

//        this.searchEbay(query);
//        this.searchShopify(query);

        // the old way--
//        var itemCollection = this.collection;
//        itemCollection.create({
//            title: query
//        });
//        console.log(itemCollection);


        return this.$('#add-item').val('');
    },


    vars: function(){
        var data;

        data = {
            //Please use you're own API key, thanks!
            API_KEY: 'AIzaSyCHOnYhOr4Bo0pb0DqM_qUBjFShowf2-dw',
            BACKUP_KEY: 'AIzaSyDy6qMWnHsz18JB1SWzBMLBFUyJmyw7cQ4',
            MAX_DEFAULT: 12,
            TOPICS: [ "Arts", "Music", "Poetry", "Cooking",	"Psychology", "Travel", "Spirituality", "Science", "Romance", "Suspense" ]
        };

        return data;

    },


    search: function(e){
        var $value = $('#add-item').val();
        e.preventDefault();
        //Remove previous search results
        //$('#books').html('');
        //Do a search with the form input as the query
        this.queryApi($value, index='0', this.vars().MAX_DEFAULT);
        //Reset any routes
        window.location.hash = '';
    },

    doAjax: function (url, data) {
        return $.ajax({
            dataType: 'jsonp',
            data: data,
            cache: false,
            url: url
        });
    },

    queryApi: function(term, index, maxResults, subject) {
        var that = this;
        var aj,
            self = this,
            $books = $('#books'),
            url = 'https://www.googleapis.com/books/v1/volumes?',
            data = 'q='+encodeURIComponent(term)+'&startIndex='+index+'&maxResults='+maxResults+'&filter=free-ebooks&key='+this.vars().API_KEY+'&projection=full',
            moreBtn = '<button data-index="'+index+'" data-term="'+term+'" data-maxresults="'+maxResults+'" class="btn more-button" href="#">&#43; More of these books</button>',
            dupBtn = moreBtn.length;

        //Show loading indicator
        $books.addClass('loading');

        aj = this.doAjax(url, data);

        //jQuery promise object tells us when ajax is done
        aj.done(function () {
            var Books = that.collection,
                data = aj.responseJSON,
                emptyBooks = 0;

            //Traverse the API response and put each JSON book into a model
            if (data) {

                //If API quota runs out
                //give a message
                data.error = data.error || {};
                data.error.message = data.error.message || {};
                if (data.error.message === 'Daily Limit Exceeded') {
                    _.once(self.deadApi(data.error.message));
                }

                _.each(data.items, function(item) {
                    //Define JSON values, this prevents ajax errors

                    if (item.volumeInfo.imageLinks.thumbnail) {

                        var itemInfo = {
                            volumeInfo : item.volumeInfo || {},
                            title: item.volumeInfo.title,
//                            imageLinks : item.volumeInfo.imageLinks || {},
                            thumbnail : item.volumeInfo.imageLinks.thumbnail || '',
                            wantToRead: ''
                        };

                        var book = new GoogleBooks.Models.Book(itemInfo);

                        Books.add(book);

                        console.log(itemInfo);
                    } else {
                        emptyBooks++;
                    }
                });

                //Some granular searches return empty books, no books, books without images etc.
                //If that happens, split off the 'subject:', or 'author:' part and
                //do another query
                if (emptyBooks > 3 || data.totalItems < 25 && !subject) {
                    var s = term.split(':'),
                        newsearch = s[1];
                    self.queryApi(newsearch, index, maxResults);
                }
            }

            //Remove old ajax data
            delete aj;

            //Instantiate the AllBooksViews with a collection of books and render them

            //-------------------


//            var allView = new allBooksView({ collection: Books });
//            allView.render();
//
//            //If a topic and collection isn't empty,
//            //prepend with the topic title and append a 'more' link
//            if (subject && Books.length > 0) {
//                item.topic(subject, maxResults);
//            }
//
//            //If the index is greater then 0 and this isn't topics,
//            //replace new books with old books. Otherwise APPEND to old books.
//            index > 0 || subject ? $books.append(allView.el) : $books.html(allView.el);
//
//            //Remove loading indicator
//            $books.removeClass('loading');
        });

        //Append a 'more' button, except if its topics or 'mybooks'
        if (!subject || !dupBtn) {
            $('#more-books').empty().append(moreBtn);
        }
    },

    addItem : function(item) {
        var itemview;
        itemview = new GoogleBooks.Views.Book({
            model: item
        });
        var row = itemview.render().el ;

        this.$('.row').append(row);
        return this;
    },

    searchGBooks: function beginSearch(query) {

        var that = this;
        var itemCollection = that.collection;

        var data = {
            API_KEY: 'AIzaSyCHOnYhOr4Bo0pb0DqM_qUBjFShowf2-dw',
            BACKUP_KEY: 'AIzaSyDy6qMWnHsz18JB1SWzBMLBFUyJmyw7cQ4',
            MAX_DEFAULT: 12,
            TOPICS: [ "Arts", "Music", "Poetry", "Cooking",	"Psychology", "Travel", "Spirituality", "Science", "Romance", "Suspense" ]
        };

        $.getJSON("https://www.googleapis.com/books/v1/volumes?",

            {
                key:"AIzaSyCHOnYhOr4Bo0pb0DqM_qUBjFShowf2-dw",
                fts: query,
                min:0,
                count:20,
                format:"JSONP"
            },


            function (data) {
                console.log(data);
                $.each(data.products, function (i, product) {


                    var itemInfo = {
                        title : product.name,
                        currentPrice : '$' + product.price,
                        endTime : '',
                        link : product.url,
                        image :  product.images[1].url
                    };
                    itemCollection.create(itemInfo);


//                    var tpl = $('<div class="col-md-3">' +
//                                    '<div class="tile">' +
//                                        '<img src=" ' + product.images[1].url +  ' "> ' +
//                                        '<h3 class="tile-title">' + product.name + '</h3>' +
//                                    '</div> ' +
//                                '</div>');
//
//                    $(tpl[0]).appendTo(".row");
//                    console.log(tpl[0]);
                });
                console.log(itemCollection);

            }
        );
    },

    searchShopify: function beginSearch(query) {

        var that = this;
        var itemCollection = that.collection;

        $.getJSON("http://api.shopstyle.com/action/apiSearch?callback=?",

            {
                pid:"uid3489-4324817-25",
                fts: query,
                min:0,
                count:20,
                format:"JSONP"
            },


            function (data) {
                console.log(data);
                $.each(data.products, function (i, product) {


                    var itemInfo = {
                        title : product.name,
                        currentPrice : '$' + product.price,
                        endTime : '',
                        link : product.url,
                        image :  product.images[1].url
                    };
                    itemCollection.create(itemInfo);


//                    var tpl = $('<div class="col-md-3">' +
//                                    '<div class="tile">' +
//                                        '<img src=" ' + product.images[1].url +  ' "> ' +
//                                        '<h3 class="tile-title">' + product.name + '</h3>' +
//                                    '</div> ' +
//                                '</div>');
//
//                    $(tpl[0]).appendTo(".row");
//                    console.log(tpl[0]);
                });
                console.log(itemCollection);

            }
        );
    },

    searchEbay: function(q){
        console.log(q);
        var that = this;

        var url = 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords' +
            '&SERVICE-VERSION=1.12.0' +
            '&SECURITY-APPNAME=jakebake-9ba2-4987-aee2-eacd5bbac7e8' +
            '&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD' +
            '&keywords=' + q +
            '&paginationInput.entriesPerPage=4';

        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(data){
                console.log(data);
                var results = data.findItemsByKeywordsResponse[0].searchResult[0].item;
                var itemCollection = that.collection;

                $.each(results, function(i, val){


                    var res = results[i];
                    var itemInfo = {
                        title : res.title[0],
                        currentPrice : '$' + res.sellingStatus[0].currentPrice[0].__value__,
                        endTime : res.listingInfo[0].endTime[0],
                        link : res.viewItemURL[0],
                        image : res.galleryURL[0]
                    };

//                    var collection = new GoogleBooks.Collections.DetailsCollection({
//                        model: GoogleBooks.Models.Details
//                    });
//                    collection.put(itemInfo);  // the old way
                    itemCollection.create(itemInfo);
                });

//                console.log(itemCollection);

            },
            error: function(e){
                alert(e.message);
            }
        });
    }
});
