/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 7/1/14
 * Time: 10:33 PM
 * To change this template use File | Settings | File Templates.
 */
GoogleBooks.Views.ListMenuItemView = Backbone.View.extend({
    tagName: 'UL',
    className: 'list-menu-item',

    template: JST['topics'],

    events: {
        'click': 'open'
    },

    initialize: function() {
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this);
    },

    render: function() {
        var $el = $(this.el);
        $el.data('name', this.model.get('id'));
        $el.html(this.template(this.model.toJSON()));
        return this;
    },

    open: function() {
        var self = this;
        return false;
    }
});
