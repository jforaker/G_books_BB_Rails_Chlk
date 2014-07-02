/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 7/1/14
 * Time: 10:32 PM
 * To change this template use File | Settings | File Templates.
 */
GoogleBooks.Views.ListMenuView = Backbone.View.extend({
    el: '#topics',

    initialize: function() {
        this.collection.on('add', this.render, this);
    },

    render: function() {
        var $el = $(this.el);
        console.log($el);
        this.collection.each(function(list) {
            var item;
            item = new GoogleBooks.Views.ListMenuItemView({ model: list });
            $el.append(item.render().el);
        });
        return this;


    }
});