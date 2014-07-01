GoogleBooks.Views.Details = Backbone.View.extend({
    el : '#details',
    template : JST['books/deets'],
    events: {
        "click .close" : 'pushstateClick',
        "click #closer": 'closeMe',
        "click .window-overlay" : "hideModaler",
        "click #want-button" : 'wantClick'
    },

    initialize : function() {
      //  _.bindAll(this, "render", "showModal", "showBook","pushstateClick", "closeMe", "hideModaler");
        this.listenTo(this.model, 'change');
          _.bindAll(this, "render", "showModal","pushstateClick", "closeMe", "hideModaler" , "wantClick");

        Backbone.history.navigate('/details/' + ( typeof this.model.attributes.id != "undefined" ? this.model.attributes.id : ''));
    },

    render:function () {
        var that = this;
        var attr = this.model.attributes,
            id = attr.readerLink;
        $(this.el).html(this.template({
            title: attr.title,
            thumbnail: attr.thumbnail,
            readerLink: attr.readerLink
        }));
        that.showModal(id);
        return this;
    },



    showModal: function(ids){
        var that = this;
        // Load the Embedded Viewer API, calling showBook when it's ready
        function callbackFn() {
            var id = ids;

            $('.window-overlay').show();
            //that.showBook(id);
            var canvas = document.getElementById('viewer');
            var viewer = new google.books.DefaultViewer(document.getElementById('viewer'));
            var canvasDiv = $('#viewer');

            console.log(canvas);
            viewer.load(id);
            canvasDiv.fadeIn("fast");
        }

        google.load("books", "0", { "callback" : callbackFn });

    },

    pushstateClick: function(event){
        event.preventDefault();
        $('.window-overlay').hide();
        Backbone.history.navigate('');
    },

    closeMe: function(e){
        this.pushstateClick(e);
    },

    hideModaler: function(e){
        this.pushstateClick(e);
    },

    wantClick: function(e){
        e.preventDefault();
        $('.window-overlay').hide();

        var model = this.model;
        model.set({
            wantToRead: true,
            readerLink: model.attributes.readerLink
        });
        model.save();
        console.log(model);
    }
});