window.GoogleBooks = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    initialize: function() {

        app = new GoogleBooks.Routers.AppRouter({});
        Backbone.history.start({pushstate: true});

        $(document).on("click", "a:not([data-bypass])", function(evt) {
            // Get the absolute anchor href.
            var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
            // Get the absolute root.
            var root = location.protocol + "//" + location.host + app.root;


            console.log(href);
            // Ensure the root is part of the anchor href, meaning it's relative.
            if (href.prop && href.prop.slice(0, root.length) === root) {
                // Stop the default event to ensure the link will not cause a page
                // refresh.
                evt.preventDefault();

                // `Backbone.history.navigate` is sufficient for all Routers and will
                // trigger the correct events. The Router's internal `navigate` method
                // calls this anyways.  The fragment is sliced from the root.
                Backbone.history.navigate(href.attr, true);
            }
        });


    }
};

$(document).ready(function(){
    GoogleBooks.initialize();

});
