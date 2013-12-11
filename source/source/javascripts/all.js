//= require_tree .

$(function(){

	Social.init();

	var face = $('#face-container');

	face.click(function() {
		face.addClass('mousedown');
		setTimeout(function() {
			face.removeClass('mousedown');
		}, 500);
	});

});