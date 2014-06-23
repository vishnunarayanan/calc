function calc(yourName) {
	this._yourName = yourName;    
};

calc.prototype.add = function(firstOperand, secondOperand) {
	var result = firstOperand + secondOperand;
	return this._yourName + " the addition result is: " + result;
}