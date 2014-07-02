GoogleBooks.Views.Topics = Backbone.View.extend({

    el: "#topics",
    tagName: 'li',
    template: JST['topics'],
    events : {
        'click a' : 'click_handler'
    },

    initialize: function() {
        _.bindAll(this, 'render');
    },

    render : function() {
        $(this.el).html(this.template({
            Art: 'Art',
            History: 'History',
            Drama: 'Drama',
            Science: 'Science',
            Biography: 'Biography',
            Classics: 'Classics',
            Comics: 'Comics',
            Poetry: 'Poetry'
        }));
        return this;
    },

    query: function(val){

        var items = new GoogleBooks.Collections.Items();
        var view = new GoogleBooks.Views.ItemsIndex({
            collection: items
        });
        view.queryApi(val, 0, 10)
    },

    click_handler: function(e) {
        var name = e.target.className;
        this.query(name);
        $('body').find('#all-wants').html('');
    }
});
