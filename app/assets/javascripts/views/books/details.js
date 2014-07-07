GoogleBooks.Views.Details = Backbone.View.extend({
    el : '#details',
    className: '.window-overlay',
    template : JST['books/deets'],
    events: {
        "click .close" : 'pushstateClick',
        "click #closer": 'closeMe',
        "click .window-overlay" : "hideModaler",
        "click #want-button" : 'wantClick'
    },

    initialize : function() {
      //  _.bindAll(this, "render", "showModal", "showBook","pushstateClick", "closeMe", "hideModaler");
//        this.collection = new GoogleBooks.Collections.Items();
//        this.listenTo( this.collection, 'add', this.addBook );
          _.bindAll(this, "render", "showModal","pushstateClick", "closeMe", "hideModaler" , "wantClick");

        Backbone.history.navigate('/details/' + ( typeof this.model.attributes.id != "undefined" ? this.model.attributes.id : ''));
    },

    render:function (i) {
        var that = this;
        var attr = this.model.attributes;
        var id = attr.readerLink;
        $(this.el).html(this.template({
            mode: i ? false : true
        }));
        console.log(arguments)
        that.showModal(typeof id == 'undefined' ? i : id);
        return this;
    },



    showModal: function(ids){
        function callbackFn() {
            $('.window-overlay').show();
            var canvas = document.getElementById('viewer');
            var viewer = new google.books.DefaultViewer(document.getElementById('viewer'));
            var canvasDiv = $('#viewer');

            console.log(canvas);
            viewer.load(ids);
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
            readerLink: model.get('readerLink')
        });
        model.save();

        console.log(model);
    }
});