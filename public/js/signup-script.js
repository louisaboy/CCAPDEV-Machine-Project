$(".email-signup").hide();

$("#signup-box-link").click(function(){
  $(".email-login").fadeOut(100);
  $(".email-signup").delay(100).fadeIn(100);
  $("#login-box-link").removeClass("active");
  $("#signup-box-link").addClass("active");
});

$("#login-box-link").click(function(){
  $(".email-login").delay(100).fadeIn(100);;
  $(".email-signup").fadeOut(100);
  $("#login-box-link").addClass("active");
  $("#signup-box-link").removeClass("active");
});

// $('submit-buttn').click(function(){
//   $("input:username").val("");
//   $("input:date").val("");
//   $("input:email").val("");
//   $("input:password").val("");
// })

function picPreview(uploader) {
  if ( uploader.files && uploader.files[0] ){
        $('#profileImage').attr('src', 
           window.URL.createObjectURL(uploader.files[0]) );
  }
}

$("#imageUpload").change(function(){
  picPreview( this );
});

$("#profileImage").click(function(e) {
  $("#imageUpload").click();
});

// $("#email-signup").validate({
//   rules: {
//       password_confirm: { 
//            equalTo: "#password"
//       }
//   }
// });
