

document.WebCursorSite = true;

$(function(){

	Social.init();

	var face = $('#face-container');
	var mouth = $('#mouth');

	mouth.click(function() {
		face.addClass('mousedown');
		setTimeout(function() {
			face.removeClass('mousedown');
		}, 500);
	});

});
