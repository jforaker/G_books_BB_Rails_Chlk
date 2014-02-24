GoogleBooks.Collections.Items = Backbone.Collection.extend({
    url:  '/books',
    model: GoogleBooks.Models.Book,

    initialize: function(){
        console.log("GoogleBooks.Collections.Items initialized!!");
    },

    parse : function(response){
        return response.items;
    }

});
