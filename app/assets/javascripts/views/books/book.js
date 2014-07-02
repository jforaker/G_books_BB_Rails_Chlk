GoogleBooks.Views.Book = Backbone.View.extend({

    tagName: 'li',
    template : JST['books/gbook'],
    className: 'book-holder',
    attributes: {
        "data-book": "book-item"
    },

    events : {
        'click a.remove-item': 'removeItem',
        'click .deets': 'renderDetails',
        'click a.infoOpen' : 'showInfo',
        'click span.close-details' : 'hideInfo',
        'click a.attach' : 'attach'
    },

    initialize : function() {
        this.listenTo(this.model, 'change', this.render);
        return this.listenTo(this.model, 'destroy', this.remove);
    },

    render : function() {

        var attr = this.model.attributes;
        $(this.el).html(this.template({
            mode : CHLK_MODE,
            user_role: CHLK_USER_ROLE,
            title: attr.title,
            thumbnail: attr.thumbnail,
            author: attr.author,
            pageCount: attr.pageCount,
            publishedDate: attr.publishedDate
        }));

        return this;
    },

    renderDetails: function(e){
        e.preventDefault();
        var that = this,
        detailsView = new GoogleBooks.Views.Details({
            model: that.model
        });
        console.log(detailsView);
        return  $('body').find("#details").append(detailsView.render());


    },

    removeItem: function() {
        return this.model.destroy();
    },

    showInfo: function(e) {
        e.preventDefault();
        classie.add( this.el.children[0], 'details-open' );  //add class to Figure
    },

    hideInfo: function() {
        classie.remove( this.el.children[0], 'details-open' );
    },

    attach: function(e){
        e.preventDefault();
        console.log('attach!!');
        var annId = CHLK_ANN_ID;
        var attr = this.model.attributes;

        var bookData = {
            g_books_id : attr.readerLink,
            announcementapplicationid: annId
        };

        $.ajax({
            method: 'POST',
            url: 'announcements/' + annId,
            dataType: 'json',
            data: bookData,
            success: function (data) {
                console.log(data)

                $('.flasher').addClass('show');

            }
        });
    }
});
