(function() {
  
  if (document.WebCursorInit) {
    return;
  };

  document.WebCursorInit = true;

  var cc = {};

  cc.config = {
    cursePoolTotal: 10,
    hostedUrl: '//thewebcursor.herokuapp.com/ChromeExt/',
    imagePath: 'images/curse_{{id}}.png',
    isChromeExt: chrome && chrome.storage
  };
  

  // Initializes UI
  cc.init = function() {
    console.log('TheCursor:', 'Init.');

    if(cc.config.isChromeExt){
      chrome.storage.local.get('firstUse', function(obj) {
        if(!obj.firstUse) {
          chrome.storage.local.set({'firstUse': true}, function() { });
          chrome.storage.local.set({'cursingEnabled': true}, function() {
            cc.initComplete();
          });
        } else{
          cc.initComplete();
        }

      });
    } else {
      cc.insertScriptsAndCSS();
    }
  };

  cc.initComplete = function() {
    cc.loadComplete();
  };

  cc.insertScriptsAndCSS = function() {
    console.log('TheCursor:', 'Insering remote css and js.');

    // css
    var styleTag = document.createElement('link');                                      
    styleTag.setAttribute('rel', 'stylesheet');
    styleTag.setAttribute('href', '//thewebcursor.herokuapp.com/ChromeExt/stylesheets/main.css');  
    document.body.appendChild(styleTag);  

    // tweenlite javascrtipt
    if(typeof TweenLite === 'undefined') {
      var scriptTag = document.createElement('script');
      scriptTag.setAttribute('src', '//thewebcursor.herokuapp.com/ChromeExt/javascripts/libs/tweenlite-min.js');
      document.body.appendChild(scriptTag);
    }

    cc.loadImages();
    cc.initComplete();
  };

  cc.loadImages = function() {
    console.log('TheCursor:', 'Loading images.');

    var html = '',
    url,
    i = 0,
    len = cc.config.cursePoolTotal;

    for(i; i<len; i++) {
      url = cc.config.hostedUrl + cc.config.imagePath.replace('{{id}}', i);
      html = html + '<img src="' + url + '" />';
    }

    var divTag = document.createElement('div');                                   
    divTag.setAttribute('id', 'cc-image-load');
    divTag.innerHTML = html;
    document.body.appendChild(divTag);  
  }

  cc.loadComplete = function() {

    document.onclick = function(e) {
      if(cc.config.isChromeExt){
        chrome.storage.local.get('cursingEnabled', function(obj) {
          console.log('cursingEnabled', obj.cursingEnabled);
          if(obj.cursingEnabled) {
            cc.onClick(e);
          }
        });

        return;
      }

      cc.onClick(e);
    };
  }

  cc.onClick = function(e) {

    var curseId = "cc-curse-view-" + Math.floor((Math.random() * 1000)),
    data = {
      id: curseId,
      src: cc.getRandomCurse(),
      position: {
        top: e.pageY ? e.pageY : e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
        left: e.pageX ? e.pageX : e.clientY + document.body.scrollTop + document.documentElement.scrollTop
      }
    };

    var el = cc.addCurseToDom(data);

    TweenLite.to(el, 0.15, {top: data.position.top, opacity: 1, ease: Quad.easeOut, onComplete: function() {
      TweenLite.to(el, 0.5, {delay: 1, top: data.position.top - 10, autoAlpha: 0, ease: Quad.easeIn, onComplete: function() {
        document.body.removeChild(el);
      }});
    }});

    if(cc.config.isChromeExt) {
      chrome.storage.local.get('totalCurses', function(obj) {
        console.log(obj);
        obj.totalCurses = obj.totalCurses ? obj.totalCurses : 0;
        chrome.storage.local.set({'totalCurses': obj.totalCurses + 1}, function() { });
      });
    }
  };

  cc.getRandomCurse = function() {

    var id = Math.floor(Math.random() * cc.config.cursePoolTotal),
    url = cc.config.imagePath.replace('{{id}}', id);
    
    if(cc.config.isChromeExt) {
      url = chrome.extension.getURL(url);
    } else {
      url = cc.config.hostedUrl + url;
    }
    
    return url;
  };

  cc.addCurseToDom = function(data) {

    var el = document.createElement('div');   
    el.id = data.id;
    el.className = 'cc-curse-view';
    el.style.background = "url('" + data.src + "')";
    el.style.top = data.position.top + 10 + 'px';
    el.style.left = data.position.left + 'px';

    document.body.appendChild(el);   

    return el;
  };

  cc.init();

})();
