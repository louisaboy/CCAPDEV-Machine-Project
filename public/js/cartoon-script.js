$(document).ready(function() {
	$('button').click(function() {
		var comment = $('.commentBox').val();
		var rate = $('#ratings').val();

		$("input[name=nameGoesHere]").val();
		// $('<li>').text(comment).prependTo('.comments');
		var commentTemplate = $(".comments").children().first().clone(true);
		$('.rate1', commentTemplate).html(rate);
		$('.cmnt', commentTemplate).html(comment)
		
		$(commentTemplate).show();
		$('.comments').append(commentTemplate);

		$('button').attr('disabled', 'true');
		$('.commentBox').val('');
	});

	$(".item").on("click", "#dlt-bt", function() {
		$(this).parent().remove();
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

	$(".toggleimg img").click(function() {
		btn = $(this),
		btn.toggle();
		btn.siblings().show();
		// btn.prev(".toggleimg img").toggle
		// btn.next(".toggleimg img").toggle();
	});

	$(".edt-bt").click(function() {
		$(this).siblings().removeAttr('readonly');
	});

	$(".dlt-bt").click(function() {
		$(this).parent().remove();
	});
});