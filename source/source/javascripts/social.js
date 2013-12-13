(function() {

	var Social = this.Social = function() { };

	/**
	 * PINTEREST
	 **/
	var PINTEREST_URL = "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{media}}&description={{description}}";

	Social.pinterest = function (url, media, description) {
		var url = PINTEREST_URL.replace('{{url}}', encodeURIComponent(url)).replace('{{media}}', encodeURIComponent(media)).replace('{{description}}', encodeURIComponent(description));
		window.open( url, 'newWindow', 'height=335,width=550,scrollbars=0,resizable=0'); 
	};

	/**
	 * TWITTER
	 **/
	var TWITTER_URL = "https://twitter.com/intent/tweet?text={{text}}&url={{url}}";

	Social.twitter = function (text, url) {
		var url = TWITTER_URL.replace('{{url}}', encodeURIComponent(url)).replace('{{text}}', encodeURIComponent(text));
		window.open( url, 'newWindow', 'height=257,width=550,scrollbars=0,resizable=0'); 
	};

	/**
	 * FACEBOOK
	 **/
	var FACEBOOK_URL = "https://www.facebook.com/sharer/sharer.php?u={{url}}";

	Social.facebook = function (url) {
		var url = FACEBOOK_URL.replace('{{url}}', encodeURIComponent(url));
		window.open( url, 'newWindow', 'height=335,width=550,scrollbars=0,resizable=0'); 
	};

	/**
	 * Attach handlers to elements with specific classes
	 **/
	Social.init = function ($el) {

		if(!$el){$el = $('body');}

		$('.social.pinterest', $el).click(function (e) {
			var data = $(this).data();
			Social.pinterest(data.url, data.media, data.description);
		});

		$('.social.twitter', $el).click(function (e) {
			var data = $(this).data();
			Social.twitter(data.text, data.url);
		});

		$('.social.fb', $el).click(function (e) {
			var data = $(this).data();
			Social.facebook(data.url);
		});

	};

})();