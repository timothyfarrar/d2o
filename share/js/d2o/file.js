var File = Class.extend({
  init: function (args){
    var defaults = {
      file : "",
      content: "",
      elem: $("body")
    };
    this.opts = $(defaults).extend(args);
    this.isChanged = false;
    this.lastSaveValue = this.opts.content;
    this.fileObj;
    this.hasWriteAccess = false;
    this.elem = this.opts.elem
                          .append('<div class="editor"></div>')
                          .find("div.editor");
    this.load();
  },
  load: function (){
    var objThis = this;
    objThis.editor = CodeMirror(
    objThis.elem[0],
    {
      lineNumbers: true,
      value: this.content || "",
      change: function(e){
      }
    });
    objThis.editor.on("change", function(e){
      objThis.setIsChanged();
    });
  },
  getIsChanged: function (){
    return this.isChanged;
  },
  setIsChanged: function (){
    this.isChanged = this.editor.getValue() === this.lastSaveValue;
    this.isChanged && this.editor.signal(this, "isChanged");
  },
  save: function(){
    var objThis = this;
    this.lastSaveValue = this.editor.getValue();
    console.debug('a');
    if (objThis.fileObj && objThis.hasWriteAccess) {      
    console.debug('b');
      objThis.fileObj.createWriter(function(fileWriter) {
    console.debug('c');
        fileWriter.onerror = function(e) {
          console.log("Write failed: " + e.toString());
        };
        var blob = new Blob([objThis.editor.getValue()]);
        fileWriter.truncate(blob.size);
        fileWriter.onwriteend = function() {
          console.debug('d');
          fileWriter.onwriteend = function(e) {
          console.debug('e');
            handleDocumentChange(objThis.fileObj.fullPath);
            console.log("Write completed.");
          };
          fileWriter.write(blob);
        }
      }, objThis.errorHandler);
    } else {
      chrome.fileSystem.chooseEntry({ type: 'saveFile' }, function () {
        objThis.hasWriteAccess = true;
        objThis.save();
      });
    }
  }
});