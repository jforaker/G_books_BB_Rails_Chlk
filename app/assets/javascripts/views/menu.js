GoogleBooks.Views.Menu = Backbone.View.extend({
    el: '#gn-menu',
    template : JST['menu'],

    initialize: function(){
        _.bindAll(this, "render");
    },

    render: function(){
        //todo - use user model

        var name = typeof CHLK_USER != 'undefined' ? CHLK_USER.name : 'there';
        var compiledHTML= $(this.template({
            name: name
        }));
        $('#namer').html(compiledHTML);
    }
});