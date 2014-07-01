/**
 * Created with JetBrains RubyMine.
 * User: jakeforaker
 * Date: 6/30/14
 * Time: 3:18 PM
 * To change this template use File | Settings | File Templates.
 */
GoogleBooks.Views.AttachedBook = Backbone.View.extend({

    el : '#details',
    template : JST['books/attachment-deets'],
    events: {
        "click .close" : 'pushstateClick',
        "click #closer": 'closeMe',
        "click .window-overlay" : "hideModaler"
    },

    initialize : function() {
        _.bindAll(this, "render", "pushstateClick", "closeMe", "hideModaler");

    },

    render : function(id) {
        $(this.el).html(this.template({
            close: "CLOSEEE"
        }));

        function callbackFn() {
            //that.showBook(id);
            var canvas = document.getElementById('viewer');
            var viewer = new google.books.DefaultViewer(document.getElementById('viewer'));
            var canvasDiv = $('#viewer');

            console.log(canvas);
            viewer.load(id);
            canvasDiv.fadeIn("slow");
            $('.window-overlay').fadeIn("fast");

        }

        google.load("books", "0", { "callback" : callbackFn });
        return this;

    },
    pushstateClick: function(e){
        e.preventDefault();

        $('.window-overlay').hide();
    },

    closeMe: function(e){
        this.pushstateClick(e);
    },

    hideModaler: function(e){
        this.pushstateClick(e);
    }

});
