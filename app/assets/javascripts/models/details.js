GoogleBooks.Models.Details = Backbone.Model.extend({



    initialize: function () {
//        _.bindAll(this, "addImage");
//        //this.on('change:image', this.addImage);
//        // or, for all attributes
//        this.on('change', this.update);
    },



    // add the image to the model.
    addAttributes: function(prop, value) {
        this.save({
            image: value
            //add other stuff

        });

        console.log("update : " + this.get("image"));

    }
});