GoogleBooks.Views.Book = Backbone.View.extend({
    template : JST['books/book'],
    className: 'col-md-3 item',
    attributes: {
        "data-attr": "mydata"
    },

    events : {
        'click a.remove-item': 'removeItem',
        'click a#deets': 'renderDetails'

    },

    initialize : function() {
        // _.bindAll(this, "render");
        this.listenTo(this.model, 'change', this.render);
        return this.listenTo(this.model, 'destroy', this.remove);
    },

    render : function() {

        var attr = this.model.attributes;
        $(this.el).html(this.template({
            title: attr.title,
            thumbnail: attr.thumbnail
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
    }
});
