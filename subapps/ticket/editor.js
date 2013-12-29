onload = function() {
	console.debug(document.getElementById('open'));
	document.getElementById('open').addEventListener('click', function(e) {
	  chrome.fileSystem.chooseEntry({type: 'openFile'}, function(readOnlyEntry) {
	 
	    readOnlyEntry.file(function(file) {
	      var reader = new FileReader();

	      reader.onloadend = function(e) {
	        console.log(e.target.result);
	      };

	      reader.readAsText(file);
	    });
		});
	});
}