GoogleBooks.Views.Want = Backbone.View.extend({
    el : '.want-list',

    template : JST['books/want'],

    events:{
        'click #removeAll' : 'removeAll',
        'click #showAllWants' : 'showAllWants'
    },

    initialize : function() {
        return this.listenTo(this.collection, 'all', this.render);
    },

    render : function() {
        var wants = this.collection,
            wantsArr = [],
            getWants = wants.where({ wantToRead: true });

        wantsArr.push(getWants);
        var totalWants = wantsArr[0].length || '';

        $(this.el).html(this.template({
            wantToRead: totalWants
        }));
        return this;
    },

    removeAll: function(){
        _.invoke(this.collection.toArray(), 'destroy');
    },

    showAllWants: function(){
        var allWantsView = new GoogleBooks.Views.Wants({
            collection: this.collection,
            el: '#all-wants'
        });
        console.log(allWantsView);
        return $(this.el).find('#all-wants').append(allWantsView.render());
    }
});