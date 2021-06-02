$(document).ready(function() {
	$('button').click(function() {
		var comment = $('.commentBox').val();
		$('<li>').text(comment).prependTo('.comments');
		$('<li>').prepend('<img class="comment-pic" src="./images/ProfilePic/Yotsubarashii.jpg"/>');
		$('button').attr('disabled', 'true');
		$('.commentBox').val('');
	});
	
	$('.commentBox').keyup(function() {
		var commentLength = $(this).val().length;
		
		if (commentLength == 0) {
	 		$('button').attr('disabled', 'true');
	 	} else {
	 		$('button').removeAttr('disabled', 'true');
 		}
	});
	
	 $('button').attr('disabled', 'true');
});