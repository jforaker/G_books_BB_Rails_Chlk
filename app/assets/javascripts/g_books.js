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
    CHLK_USER = {};
    CHLK_ANN_ID ={};
    CHLK_USER_ROLE ={};
    CHLK_MODE = {};
    $.ajax({
        url: '/books.json',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            CHLK_USER.name = data.user || 'there';
            CHLK_USER_ROLE = data.role != "student"
        }
    });

    GoogleBooks.initialize();

    $('body').find('.window-overlay').click(function(){
        $(this).hide();
    });



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
