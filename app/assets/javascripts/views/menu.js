GoogleBooks.Views.Menu = Backbone.View.extend({

    el: '.sidr-inner',

    template : JST['menu'],

    initialize: function(){
        _.bindAll(this, "render");
    },

    render: function(){
        var name = CHLK_USER.name;
        var compiledHTML= $(this.template({
            name: name
        }));
        $('#namer').append(compiledHTML);
    }
});