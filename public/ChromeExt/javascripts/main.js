(function() {
  
  if (document.WebCursorInit) {
    return;
  };

  document.WebCursorInit = true;

  var cc = {};

  cc.config = {
    cursePoolTotal: 10
  };

  // Initializes UI
  cc.init = function() {

    if(chrome.storage){
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

    cc.initComplete();
  };

  cc.loadComplete = function() {

    document.onclick = function(e) {
      if(chrome.storage){
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

    if(chrome.storage) {
      chrome.storage.local.get('totalCurses', function(obj) {
        console.log(obj);
        obj.totalCurses = obj.totalCurses ? obj.totalCurses : 0;
        chrome.storage.local.set({'totalCurses': obj.totalCurses + 1}, function() { });
      });
    }
  };

  cc.getRandomCurse = function() {

    var id = Math.floor(Math.random() * cc.config.cursePoolTotal),
    url = 'images/curse_' + id + '.png';
    
    if(chrome.storage) {
      url = chrome.extension.getURL(url);
    } else {
      url = '//thewebcursor.herokuapp.com/extension/ChromeExt/images/' + url;
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
