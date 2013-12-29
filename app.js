const PLACEHOLDER_IMAGE = "loading.gif";


chrome.app.runtime.onLaunched.addListener(function() {
  // normal launch initiated by the user, let's start clean.
  // note that this is not related to the persistent state, which is
  // appropriately handled in the window code.
  runApp(false);
});

chrome.app.runtime.onRestarted.addListener(function() {
  // if restarted, try to get the transient saved state
  runApp(true);
});

var clearInitialState = function(){
    // commands here
}

var runInitialState = function(){
    // commands here
}

var setInitialState = function(){
    // commands here
}

function runApp(readInitialState) {
  chrome.app.window.create('index.html',
    {id: 'mainwindow', bounds: {width: 500, height: 309} },
    // the create callback gets a reference to the AppWindow obj 
    function(win) {
      // when the callback is executed, the DOM is loaded but no script was
      // loaded yet. So, let's attach to the load event.
      win.contentWindow.addEventListener('load', function() {
        if (readInitialState) {
          // win.contentWindow.setInitialState();
        } else {
          // win.contentWindow.clearInitialState();
        }
      });
    });
 
}