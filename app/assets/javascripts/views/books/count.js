GoogleBooks.Views.Count = Backbone.View.extend({
    el : '.remaining',

    template : JST['books/count'],

    initialize : function() {
        return this.listenTo(this.collection, 'all', this.render);
    },

    render : function() {
        var remaining;
        remaining = this.collection.length;
        $(this.el).html(this.template({
            remaining: remaining
        }));
        return this;
    }
});