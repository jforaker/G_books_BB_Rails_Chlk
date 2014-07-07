GoogleBooks.Views.MyLibraryMenu = Backbone.View.extend({
    el : 'LI#myBooks', //list item that controls the books in the #all-wants div
    template : JST['books/want'],
    events:{
        'click #removeAll' : 'removeAll',
        'click #showAllWants' : 'showMyBooks'
    },

    getCount: function(){
        var wants = this.collection,
            wantsArr = [],
            getWants = wants.where({
                wantToRead: true
            });

        wantsArr.push(getWants);
        console.log(wantsArr);

        return wants.number;
    },

    initialize : function() {

        this.model = new GoogleBooks.Models.Book();
        var c = this.collection;
        this.listenTo(this.model, 'change', this.render);
        this.model.bind('change', _.bind(this.render, this));
        return this.listenTo(c, 'all', this.render, this.getCount());
    },

    render : function() {

        var totalWants =  this.getCount();

        $(this.el).html(this.template({
            wantToRead: totalWants
        }));

        return this;
    },

    removeAll: function(){

        var pluralize = this.getCount() == 1 ? ' book' : ' books';
        var that = this;
        var di = $("#dialog-confirm");
        var message =  this.getCount() == 0 ? 'No books to delete!' : 'Are you sure you want to delete your' + pluralize + '?';
        di.html(message);
        var buttonsConfig = [
            {
                text: 'Delete ' + this.getCount() + pluralize,
                'class': "btn btn-danger",
                click: function() {
                    _.invoke(that.collection.toArray(), 'destroy');
                    $(this).dialog('close');
                    that.showMyBooks();
                }
            },
            {
                text: 'No',
                'class': 'btn btn-default',
                click: function() {
                    $(this).dialog('close');
                }
            }
        ];
        var cancel = [
            {
                text: 'Cancel',
                'class': 'btn btn-default',
                click: function() {
                    $(this).dialog('close');
                }
            }
        ];
        di.dialog({
            resizable: false,
            title: false,
            height: 250,
            width: 400,
            modal: true,
            draggable: false,
            show: 'blind',
            hide: 'blind',
            dialogClass: 'no-close success-dialog',
            buttons: this.getCount() == 0 ? cancel : buttonsConfig
        });
        console.log(di)
       // $("html, body").animate({ scrollTop: 0 }, 1);
    },

    showMyBooks: function(){

        var $booksFromSearch = $('.book-holder'),
            $myBooksView = $('#all-wants');

        $booksFromSearch.fadeOut('fast');
        $myBooksView.show();

        var wantsView = new GoogleBooks.Views.MyLibrary({
            collection: this.collection
        });

        $booksFromSearch.append(wantsView.render())
    }
});