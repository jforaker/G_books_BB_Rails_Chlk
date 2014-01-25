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

        var attr = this.model.attributes,
            id = attr.readerLink;
        $(this.el).html(this.template({
            title: attr.title,
            thumbnail: attr.thumbnail,
            readerLink: attr.readerLink
        }));


        loadBook(id);

        function loadBook(id) {
            // Load the Embedded Viewer API, calling showBook when it's ready
            var callbackFn = function() { showBook(id); };
            google.load("books", "0", { "callback" : callbackFn });
        }

        function showBook(id) {
            // We have the book ID, API is loaded, now just show it
            var canvas = document.getElementById('viewerCanvas');
            viewer = new google.books.DefaultViewer(canvas);
            viewer.load(id);

            showCanvas(true);
            showStatus('');
        }
        function showCanvas(showing) {
            var canvasDiv = document.getElementById('viewerCanvas');
            canvasDiv.style.display =  (showing) ? 'block' : 'none';
        }
        function showStatus(string) {
            var statusDiv = document.getElementById('viewerStatus');
            var showing = !(string == null || string.length == 0);
            if (statusDiv.firstChild) {
                statusDiv.removeChild(statusDiv.firstChild);
            }
            statusDiv.appendChild(document.createTextNode((showing) ? string : ''));
            statusDiv.style.display =  (showing) ? 'block' : 'none';
        }

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
            wantToRead: true,
            readerLink: model.attributes.readerLink
        });
        model.save();
        console.log(model);
    }

});