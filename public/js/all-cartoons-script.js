// $('view-all1').click(function() {
//     $(".view-all").click();
// });

$('.view-all1').on('click', function () {
    $('.inner').css("max-height","10000px");
    $('view-all1').css("display","none");
});
