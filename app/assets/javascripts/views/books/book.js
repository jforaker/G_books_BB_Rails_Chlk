GoogleBooks.Views.Book = Backbone.View.extend({
    template : JST['books/book'],
    className: 'book-holder',
    attributes: {
        "data-book": "book-item"
    },

    events : {
        'click a.remove-item': 'removeItem',
        'click #deets': 'renderDetails',
        'click a.infoOpen' : 'showInfo',
        'click span.close-details' : 'hideInfo'
    },

    initialize : function() {
        this.listenTo(this.model, 'change', this.render);
        return this.listenTo(this.model, 'destroy', this.remove);
    },

    render : function() {

        var attr = this.model.attributes;
        $(this.el).html(this.template({
            title: attr.title,
            thumbnail: attr.thumbnail,
            author: attr.author,
            pageCount: attr.pageCount,
            publishedDate: attr.publishedDate
        }));
        return this;
    },

    renderDetails: function(){
        var that = this,
        detailsView = new GoogleBooks.Views.Details({
            model: that.model
        });
        console.log(detailsView);
        return $(this.el).find("#details").append(detailsView.render().el);
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
    }
});
