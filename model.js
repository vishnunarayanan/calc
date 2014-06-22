function CalcModel(expr) {
    var operators = ['+','-','/','*'];
    this.expr = expr;

    this.exprAppended = new Event(this);


    // evaluate expression
    function evaluate(str){
        var stack = [];
        var char;
        var expectNumber = false;
        for(var i in str){
            char = str[i];
            
            // operators
            if(operators.indexOf(char)>=0)
                stack.push(char);
            
            // numbers
            var num = parseFloat(char);
            if(!isNaN(num)){
                
                if(expectNumber){
                    num = stack.pop() + char;
                    num = parseFloat(num);
                }
                
                stack.push(num);                
                expectNumber = true;
            }
            
            // space
            if(isNaN(num))
                expectNumber = false;
                
            // ) means compute
            if(char === ')'){
                processStack(stack);
            }
                
        }
        return stack;
    }

function processStack(stack){
        var total = 0;
        var arr = [];
        var num = 0;
        var operator;
        while(true){
            num = stack.pop();
            if(typeof num === "number")
                arr.push(num);
            else{
                operator = num;
                break;
            }
                
        }
        
        arr.reverse();
        
        if(operator === '*' || operator === '/'){
            total = 1;
        }
        
        for(var i in arr){
            if(operator === '+')
                total = total + arr[i];
                    
            if(operator === '-'){
                if(i == 0){
                    total = total + arr[i];
                }
                else
                    total = total - arr[i];
            }
            
            if(operator === '*')
                total = total * arr[i];
            
            if(operator === '/'){
                if(i == 0){
                    total = total * arr[i];
                }
                else
                    total = total / arr[i];
            }
            
        }
        
        
        stack.push(total);
    }

    this.evaluate = function(){
        var result = evaluate(this.expr);
        // error handling
        if(result.length === 1){
            result = result.join("");
            this.exprAppended.notify({expr : result});
        }
        else{
            this.exprAppended.notify({expr : "invalid expression. Clear to continue"});
        }
    }
}

CalcModel.prototype = {
    append : function(character){
        this.expr = this.expr.concat(character);
        this.exprAppended.notify({expr : this.expr});
    },

    clear : function(){
        this.expr = "";
        this.exprAppended.notify({expr : this.expr});
    }
};