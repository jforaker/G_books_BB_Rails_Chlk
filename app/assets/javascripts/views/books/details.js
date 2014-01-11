GoogleBooks.Views.Details = Backbone.View.extend({
    el : '#details',

    template : JST['books/details'],

    events: {
        "click .close" : 'pushstateClick',
        "click #want-button" : 'wantClick'
    },

    initialize : function() {
        _.bindAll(this, "render");
        //Backbone.history.navigate('/details/' + this.model.attributes.id);
    },

    render:function (eventName) {

        var attr = this.model.attributes;
        $(this.el).html(this.template({
            title: attr.title,
            thumbnail: attr.thumbnail
        }));
        return this;
    },

    pushstateClick: function(event){
        event.preventDefault();
        $('.modal-backdrop').hide();
        Backbone.history.navigate('/' , {trigger: true, replace: true});
    },

    wantClick: function(event){
        event.preventDefault();
        $('.modal-backdrop').hide();
        $('#deetsModal').modal('hide');

        // the old way--
        var model = this.model;
        model.set({
            wantToRead: true
        });
        model.save();
        console.log(model);


    }

});