// testing
jQuery(function($) {
	var $ide = $("#ide"),
      $editor = $ide.find("#editor");
		  editor = new Editor({elem: $editor});
	editor.open();
  $ide
    .on("click", "#new", function (e){
      e.preventDefault();
      editor.open();
    })
    .on("click", ".closeFile", function(e){
      e.preventDefault();
      editor.close($(this).parents("li").index());
    })
    .on("click", "#open", function(e){
      e.preventDefault();
      editor.chooseFile();
    })
    .on("click", "#save", function(e){
      e.preventDefault();
      editor.save();
    })

})