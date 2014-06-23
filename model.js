function CalcModel(expr) {
    var operators = ['+','-','/','*'];
    this.expr = expr;

    this.exprAppended = new Event(this);


    // evaluate expression
    function evaluate(){
        var str = this.expr;
        var stack = [];
        var char;
        var expectNumber = false;
        var temp;
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

            // floating
            if(char === '.'){
                temp = stack.pop() +"";

                if(temp.indexOf(".") >=0)
                    throw new Error("invalid");

                temp = temp + char;

                stack.push(temp);
                expectNumber = true;
            }
                
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

function validateBraces(){
    var str = this.expr;
    var openBraceCount = 0;
    var closeBraceCount = 0;
    for(var i in str){
        if(str[i] === '(')
            openBraceCount ++;

        if(str[i] === ')')
            closeBraceCount++;
    }

    if(openBraceCount === closeBraceCount)
        return true;
    else
        return false;

}

    this.evaluate = function(){
        var result;

        try{
            if(validateBraces.call(this))
                result = evaluate.call(this);
            else
                throw new Error("invalid");
        }
        catch(e){
            this.exprAppended.notify({expr : "invalid expression. Clear to continue"});
            return e.message;
        }


        // error handling
        if(result.length === 1){
            result = result.join("");
            this.exprAppended.notify({expr : result});
        }
        else{
            this.exprAppended.notify({expr : "invalid expression. Clear to continue"});
        }

        return result;
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