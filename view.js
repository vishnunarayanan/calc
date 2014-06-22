function CalcView(model, elements) {
    this._model = model;
    this._elements = elements;

    this.buttonsClicked = new Event(this);

    var _this = this;

    // attach model listeners. Reflect the view
    this._model.exprAppended.attach(function(sender, args){
        _this.rebuildScreen(args.expr);
    });

    // attach listeners to HTML controls
    this._elements.buttons.click(function(e){
      var target = $(e.target);  
      var character;

      if(target.hasClass('calc-number')){
         character = target.children('span').text();
       }
      
      
       if(target.prop("tagName")==="SPAN"){
         character = target.text();
       }

       if(!character)
          return;

       // notify listeners
       _this.buttonsClicked.notify({character:character});
    });
}

CalcView.prototype = {
    show: function () {
        this.rebuildScreen(this._model.expr);
    },

    rebuildScreen: function(expr){
        this._elements.screen.text(expr);
    }

};