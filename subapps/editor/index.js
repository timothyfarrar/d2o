$(function(){
    var myCodeMirror = CodeMirror(document.body, {
		lineNumbers: true,
		value: "function myScript(){return 100;}\n",
  		mode:  "javascript"
	});
    console.log(myCodeMirror);
    console.log(chrome.app.window.get('project'))
})