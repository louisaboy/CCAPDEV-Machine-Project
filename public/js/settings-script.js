$('buttoon').click(function(){
    $("txtarea").val("");
})

$("input[type='image']").click(function() {
    $("input[id='my_file']").click();
});

$(document).ready(function(){
    $("#imgurl").keyup(function(){
        var inputVal = $(this).val();
        $("#profileImage").attr("src", inputVal);
    });
});