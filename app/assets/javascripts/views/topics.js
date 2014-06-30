GoogleBooks.Views.Topics = Backbone.View.extend({

    template: JST['topics'],
    el: ".bookshelf",
    tagName: 'a',

    model: this.model,
    collection: new GoogleBooks.Collections.Items(),
    events : {
        'click a' : 'click_handler',
        'hover a' : 'addHover',
        'mouseover': 'mouseovercard'

    },

    initialize: function() {
        _.bindAll(this, 'render');
    },

    render : function() {

        $(this.el).html(this.template({
            art: "art",
            history: "history"
        }));

        return this;
    },

    mouseovercard: function() {
        console.log('hello world');
    },

    query: function(val){
        //e.preventDefault();
        var items = new GoogleBooks.Collections.Items();
        var view = new GoogleBooks.Views.ItemsIndex({
            collection: items
        });
        view.queryApi(val, 0, 10)
    },

    click_handler: function() {
        var ele = $('.bookshelf').find('a');


        if (ele.hasClass('art')) {
            this.query('art');
        } else if (ele.hasClass('history')) {
            this.query('history');
        } else if (this.$el.hasClass('free')) {
            //this.checkIn();
        } else {
            // oops!?
        }
    }
});
