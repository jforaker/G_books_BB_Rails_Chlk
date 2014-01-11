GoogleBooks.Collections.DetailsCollection = Backbone.Collection.extend({
    url:  '/books',

    model: GoogleBooks.Models.Details,

    initialize: function() {
        this._meta = {};
    },

    //  collection.put(itemInfo.title, itemInfo.image, itemInfo.currentPrice, itemInfo.endTime, itemInfo.link);

    put: function(itemInfo) {

        var models = this.models;

        $.each(models, function(i, val){
            var model = models[i];
            model.save({
                title: itemInfo.title,
                currentPrice: itemInfo.currentPrice,
                endTime: itemInfo.endTime,
                link: itemInfo.link,
                image: itemInfo.image
            });
            console.log(model);
        })

    },

    get: function(prop) {
        console.log(this._meta);
        return this._meta[prop];
    }

});
