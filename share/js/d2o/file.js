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
    this.lastSaveValue = this.editor.getValue();
  }
});