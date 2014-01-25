GoogleBooks.Views.Menu = Backbone.View.extend({

    el: '.sidr-inner',

    template : JST['menu'],

    initialize: function(){
        _.bindAll(this, "render");
    },

    render: function(){
        var remaining = this.collection.length;
        var compiledHTML= $(this.template({
            remaining: remaining
        }));
        $('#menu').append(compiledHTML);

    }
});