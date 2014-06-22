function CalcController(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;

    
    // listen for view changes
    this._view.buttonsClicked.attach(function(sender, args){
        
        var character = args.character;
        if(character === '='){
            _this.evaluateExpression();
            return;
        }

        if(character.toUpperCase() === "CLEAR"){
            _this.clearExpression();
            return;
        }

        if(character.toUpperCase() === "SPACE")
            character = " ";
        if(character === 'x')
            character = '*';
        if(character === '÷')
            character = '/';



        _this.appendToExpression(character);
    });
}

CalcController.prototype = {
    
    appendToExpression : function(character){
        this._model.append(character);
    },

    clearExpression : function(){
        this._model.clear();
    },

    evaluateExpression : function(){
        this._model.evaluate();
    }
};