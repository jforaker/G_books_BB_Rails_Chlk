GoogleBooks.Models.Book = Backbone.Model.extend({
    defaults: {
        //Default JSON fields,
        //Prevent 'undefined' ajax errors
        "wantToRead" : false
//        "volumeInfo": [
//            {
//                "description": "",
//                "title": "",
//                "imageLinks": [
//                    {
//                        "smallThumbnail": "http://placehold.it/128x195/ffffff/999999",
//                        "thumbnail": "http://placehold.it/128x195/ffffff/999999"
//                    }
//                ]
//            }
//        ]
    },

    initialize: function () {

    }
});
