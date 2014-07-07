GoogleBooks.Collections.Items = Backbone.Collection.extend({
    url:  '/books',
    model: GoogleBooks.Models.Book,
    number: '',

    initialize: function(){
        console.log("GoogleBooks.Collections.Items initialized!!");

    },

    parse : function(response){
        this.number = response.items.length;
        console.log(this.number)
        return response.items;
    },

    done: function() {

        return this.where({wantToRead: true});
    },
    remaining: function() {
        return this.number;
    }

});
