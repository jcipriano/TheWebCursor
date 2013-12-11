var ccmenu = {};

ccmenu.init = function() {
	console.log('ccmenu.init');

	// check box
	ccmenu.curseCheckbox = document.getElementById('curseCheckbox');

  chrome.storage.local.get('cursingEnabled', function(obj) {

    if(obj.cursingEnabled) {
      ccmenu.curseCheckbox.checked = true;
    } else {
			ccmenu.curseCheckbox.checked = false;
    }

		ccmenu.curseCheckbox.onclick = function() {
			ccmenu.curseChecked(ccmenu.curseCheckbox.checked);
		};

  });

  // curse counter
  chrome.storage.local.get('totalCurses', function(obj) {
    obj.totalCurses = obj.totalCurses ? obj.totalCurses : 0;
    document.getElementById('totalCurses').innerHTML = obj.totalCurses;
  });

};

ccmenu.curseChecked = function(val) {
	chrome.storage.local.set({'cursingEnabled': val}, function() {
		chrome.storage.local.get('cursingEnabled', function(obj) {
      console.log('cursingEnabled', obj.cursingEnabled);
    });
  });

};

ccmenu.init();
