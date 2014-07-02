window.GoogleBooks = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    initialize: function() {

        app = new GoogleBooks.Routers.AppRouter({});
        Backbone.history.start();


    }
};

$(document).ready(function(){
    GoogleBooks.initialize();


//
//    function cb(){
//        var $container = $('#container');
//        $container.imagesLoaded( function(){
//            $container.masonry({
//                itemSelector: '.book-holder',
//                "isFitWidth": true,
//                isAnimated: true
//            });
//        });
//
//        setTimeout(function(){
//            $container.masonry('bindResize');
//            $container.masonry( 'on', 'layoutComplete', function( msnryInstance, laidOutItems ) {
//                console.log('Masonry layout completed on ' + laidOutItems.length + ' items');
//
//            })
//        },2255);
//
//    }
//
//    cb();


});
