var Editor = Class.extend({
  init: function(args){
    var defaults = {
      elem: $(document)
    },
    tabs;
    this.opts = $(defaults).extend(args);
    this.fileEntry;
    this.hasWriteAccess = false;
    this.elem = this.opts.elem;
    tabs = this.elem.append('<div class="tabs"><ul></ul></div>')
                         .find(".tabs").tabs();
    tabs.find( ".ui-tabs-nav" ).sortable({
      axis: "x",
      stop: function(){
        tabs.tabs( "refresh" );
      }
    });
    this.files = [];
    this.tabs = tabs;
    return this;
  },
  close: function (tabNum){
    var currTab = tabNum || this.tabs.tabs("option", "active");
    this.tabs.find("li:eq(" + currTab + ")")
             .add("#tabs-" + (currTab + 1))
             .remove()
           .end();
           this.tabs.tabs("refresh");
  },
  setFile: function (theFileEntry, isWritable){
    this.fileEntry = theFileEntry;
    this.hasWriteAccess = isWritable;
  },
  open: function (readOnlyEntry){
    var objThis = this,
        $newFile,
        tabNum = this.tabs.find("li").length + 1,
        fileContent = "",
        thisFile;
    this.tabs
          .find("ul")
            .append('<li><a href="#tabs-' + tabNum + '"><span class="title">New File</span> <span class="closeFile">X</span></a></li>')
          .end()
          .append('<div id="tabs-' + tabNum + '"><p></p></div>');
    $newFile = this.tabs.find("p:last");
    thisFile = new File({
      elem: $newFile,
      content: ""
    });
    this.files.push(thisFile);
    if(readOnlyEntry){
      //setFile(readOnlyEntry, true)
      readOnlyEntry.file(function(file) {
          var reader = new FileReader();
    
          // reader.onerror = errorHandler;
          reader.onloadend = function(e) {
            objThis.tabs.find("a[href=#tabs-" + tabNum + "]")
            .find(".title")
              .text(readOnlyEntry.fullPath)
            thisFile.editor.setValue(e.target.result);;
          };
    
          reader.readAsText(file);
        });
    }
    this.tabs
      .tabs("refresh")
      .tabs( "option", "active", tabNum-1);
  },
  chooseFile: function (){
    var objThis = this;
    chrome.fileSystem.chooseEntry({ type: 'openWritableFile' }, function(theFile){objThis.open(theFile)});
  },
  closeAll: function (){},
  saveCurrent: function (){}
})


function errorHandler(e) {
  var msg = "";

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
    msg = "QUOTA_EXCEEDED_ERR";
    break;
    case FileError.NOT_FOUND_ERR:
    msg = "NOT_FOUND_ERR";
    break;
    case FileError.SECURITY_ERR:
    msg = "SECURITY_ERR";
    break;
    case FileError.INVALID_MODIFICATION_ERR:
    msg = "INVALID_MODIFICATION_ERR";
    break;
    case FileError.INVALID_STATE_ERR:
    msg = "INVALID_STATE_ERR";
    break;
    default:
    msg = "Unknown Error";
    break;
  };
}
