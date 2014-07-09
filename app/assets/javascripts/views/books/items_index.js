GoogleBooks.Views.ItemsIndex = Backbone.View.extend({

    template: JST['books/index'],
    el: "#container",
    events : {
        'keypress #add-item': 'createOnEnter'
       // 'keyup': 'searchAutocomplete'
    },

    initialize : function() {

        this.listenTo(this.collection, 'reset', this.render);
        return this.listenTo(this.collection, 'add', this.addBook);
    },

    render : function() {

        var that = this;

        $(that.el).html(that.template());

        var menuView = new GoogleBooks.Views.Menu({
            collection: this.collection
        });
        var wantView = new GoogleBooks.Views.MyLibraryMenu({
            collection: this.collection
        });
        var topics = new GoogleBooks.Views.Topics();

        topics.render();
        menuView.render();
        wantView.render();

        var initPlugins = function(){
            $('.title').dotdotdot({
                watch:      true,
                ellipsis	: '... ',
                height		: 120
            });

            new GNMenu( document.getElementById( 'gn-menu' ));
        };

        if(this.collection.length > 0){
            //itemsCollection
            this.collection.each(function(bookModel) {
                var bookView = new GoogleBooks.Views.Book({
                    model: bookModel
                });
                var renderBook = bookView.render().el;
                this.$('#all-wants').append(renderBook);
                initPlugins();

                return this;
            });
        } else {
            initPlugins();
            var name = ('undefined' != CHLK_USER.name ? CHLK_USER.name : 'there');
            var row = $('<div class="rowerg"></div> ');
            $(that.$el.find('.bookshelf').append(row));
            row.html('Hi ' + name + ', welcome to Google Books Reader. Search for a book and add it to your library.');

        }
    },

    searchAutocomplete: function( e ) {
        var that = this;
        $(function(){
            var $searchForm = $('#add-item'),
                term = $searchForm.val(),
                url = 'https://www.googleapis.com/books/v1/volumes?q='+encodeURIComponent(term)+'&filter=free-ebooks&maxResults=8&key='+that.vars().API_KEY;
            $($searchForm).autocomplete({
                minLength: 3,
                source: function( request, response ) {
                    $.getJSON(url + '&callback=?', function(data) {
                        var dropdown = [];
                        _.each(data.items, function(item) {

                            var subtitle = typeof item.volumeInfo.subtitle !== "undefined" ? ': '+item.volumeInfo.subtitle : '',
                                thumb = typeof item.volumeInfo.imageLinks !== "undefined" ? item.volumeInfo.imageLinks.thumbnail : '',
                                id = item.id,
                                ele = item.volumeInfo.title.concat(subtitle);

                            dropdown.push({
                                id: id,
                                label: ele,
                                img: thumb
                            });
                        });
                        response(dropdown);
                    });
                },
                select: function( event, ui ) {
                    console.log(arguments);
                    that.queryApi(ui.item.value, index='0', 12);

//                    var id = ui.id;
//                    var detailsView = new GoogleBooks.Views.Details({
//                            //model: ui.item
//                        });
//                    console.log(detailsView);
//                    return $('body').find("#details").html(detailsView.renderModal(id));
                },
                close: function( event, ui ) {
                    $searchForm.val('');
                }
            }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
                console.log(item)
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
        //$('.gn-menu-wrapper').removeClass('gn-open-all');


        this.queryApi(query, 0, this.vars().MAX_DEFAULT);
    },

    doAjax: function (url, data) {
        return $.ajax({
            dataType: 'jsonp',
            data: data,
            cache: false,
            url: url
        });
    },

    queryApi: function(term, index, maxResults, q) {

        var bookRow = $('.bookshelf');
        var spinner = $('<div class="spinner"></div>') ;
        var that = this;
        var aj,
            url = 'https://www.googleapis.com/books/v1/volumes?',
            data = 'q='+encodeURIComponent(term)
                +'&startIndex='+index+'&maxResults='+maxResults
                +'&filter=free-ebooks&key='
                +this.vars().API_KEY+'&projection=full';

        bookRow.find('.book-holder').attr('data-something', 'from-search').fadeOut('slow').remove();

        bookRow.find('.rower').fadeOut('slow');
        bookRow.html('');
        bookRow.append(spinner);
        spinner.show();

        aj = this.doAjax(url, data);

        aj.done(function(){


            var Books = that.collection,
                data = aj.responseJSON,
                emptyBooks = 0;

            if (data) {
                spinner.hide();

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
                    } else {
                        emptyBooks++;
                    }
                });
            }

        });
    },

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
