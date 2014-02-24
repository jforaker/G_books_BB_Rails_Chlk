GoogleBooks.Views.ItemsIndex = Backbone.View.extend({

    template: JST['books/index'],
    el: "#app",
    events : {
        'keypress #add-item': 'createOnEnter',
        "keyup": "searchAutocomplete"
    },

    initialize : function() {
        this.listenTo(this.collection, 'reset', this.render);
        return this.listenTo(this.collection, 'add', this.addBook);
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('#deetsModal').remove();
    },

    render : function() {

        $(this.el).html(this.template());

        var menuView = new GoogleBooks.Views.Menu({
            collection: this.collection
        });
        menuView.render();
//        var countView = new GoogleBooks.Views.Count({
//            collection: this.collection
//        });
//        countView.render();
        var wantView = new GoogleBooks.Views.Want({
            collection: this.collection
        });

        wantView.render();


        //itemsCollection
        this.collection.each(function(bookModel) {
            var bookView = new GoogleBooks.Views.Book({
                model: bookModel
            });
            var renderBook = bookView.render().el;
            this.$('#all-wants').append(renderBook);

            return this;

        });

        new gnMenu( document.getElementById( 'gn-menu' ) );

    },

    searchAutocomplete: function( e ) {
        var that = this;
        $(function(){
            var $searchForm = $('#add-item'),
                term = $searchForm.val(),
                self = this,
                url = 'https://www.googleapis.com/books/v1/volumes?q='+encodeURIComponent(term)+'&filter=free-ebooks&maxResults=8&key='+that.vars().API_KEY;
            $($searchForm).autocomplete({
                minLength: 3,
                source: function( request, response ) {
                    $.getJSON(url + '&callback=?', function(data) {
                        var dropdown = [];
                        _.each(data.items, function(item) {

                            var subtitle = typeof item.volumeInfo.subtitle !== "undefined" ? ': '+item.volumeInfo.subtitle : '',
                                thumb = typeof item.volumeInfo.imageLinks !== "undefined" ? item.volumeInfo.imageLinks.thumbnail : '',
                                ele = item.volumeInfo.title.concat(subtitle);

                            dropdown.push({
                                label: ele,
                                img: thumb
                            });
                        });
                        response(dropdown);
                    });
                },
                select: function( event, ui ) {
                    //populate the autocomplete with an API query
                    that.queryApi(ui.item.value, index='0',12);
                },
                close: function( event, ui ) {
                    $searchForm.val('');
                    window.location.hash = '';
                }
            }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
                return $( "<li>" )
                    .data( "ui-autocomplete-item", item )
                    .append( "<div class='description'><a>" + item.label + "</a></div><img class='image' src=" + item.img + ">" )
                    .appendTo( ul );
            }
        })
    },

    createOnEnter : function(event) {
        if (event.keyCode !== 13) {
            return;
        }
        var query = this.$('#add-item').val();
        this.search(event, query);
        return this.$('#add-item').val('');
    },


    vars: function(){
        return data = {
            API_KEY: 'AIzaSyCHOnYhOr4Bo0pb0DqM_qUBjFShowf2-dw',
            BACKUP_KEY: 'AIzaSyDy6qMWnHsz18JB1SWzBMLBFUyJmyw7cQ4',
            MAX_DEFAULT: 12
        }
    },

    search: function(e, query){
        Backbone.history.navigate('/search');

        e.preventDefault();

        $('.bookshelf').fadeIn();

        var $myBooksView = $('#all-wants');

        if ($myBooksView.is(':visible')) {
            $myBooksView.fadeOut('fast');
        }

        this.queryApi(query, index='0', this.vars().MAX_DEFAULT);

    },

    doAjax: function (url, data) {
        return $.ajax({
            dataType: 'jsonp',
            data: data,
            cache: false,
            url: url
        });
    },

    queryApi: function(term, index, maxResults) {
        var that = this;
        var aj,
            self = this,
            $books = $('#books'),
            url = 'https://www.googleapis.com/books/v1/volumes?',
            data = 'q='+encodeURIComponent(term)
                +'&startIndex='+index+'&maxResults='+maxResults
                +'&filter=free-ebooks&key='
                +this.vars().API_KEY+'&projection=full';

        //Show loading indicator
        var spinner = '<div class="spinner"></div>' ;
        $('#app').append(spinner);
        $(spinner).show();

        aj = this.doAjax(url, data);

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

                    //MUST have thumbnail and be embeddable in reader

                    if (typeof item.volumeInfo.imageLinks !== "undefined" && item.accessInfo.embeddable == true) {

                        var itemInfo = {
                            title: item.volumeInfo.title || '',
                            author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : '',
                            pageCount : item.volumeInfo.pageCount || '',
                            publishedDate : item.volumeInfo.publishedDate || '' ,
                            thumbnail : item.volumeInfo.imageLinks.thumbnail || '',
                            readerLink : item.id,
                            wantToRead: false
                        };

                        var book = new GoogleBooks.Models.Book(itemInfo);
                        Books.add(book);

                        console.log(book);
                    } else {
                        emptyBooks++;
                    }
                });
            }
            $(spinner).hide();
        });
    },

    addBook : function(book) {
        var bookView = new GoogleBooks.Views.Book({
            model: book
        });
        var bookEl = bookView.render().el ;
        $(bookEl).attr("data-something", "from-search");
        this.$('.row').append(bookEl);
        return this;
    }
});
