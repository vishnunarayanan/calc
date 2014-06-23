describe('Calculator can evaluate expression', function() {
	var modelInstance;
	
	it('(+ 2 3) == 5', function() {
		var expr = "(+ 2 3)";
		var result = "5";
		modelInstance = new CalcModel(expr);

		expect(modelInstance.evaluate()).toBe(result);
	});

	it('(* (+ 2 3) (- 10 6)) == 20', function() {
		var expr = "(* (+ 2 3) (- 10 6))";
		var result = "20";
		modelInstance = new CalcModel(expr);

		expect(modelInstance.evaluate()).toBe(result);
	});

	it('(+ 1 (+ 2 (+ 3 (+ 4 5)))) == 15', function() {
		var expr = "(+ 1 (+ 2 (+ 3 (+ 4 5))))";
		var result = "15";
		modelInstance = new CalcModel(expr);

		expect(modelInstance.evaluate()).toBe(result);
	});

	it('(+ 2.1 2.1) == 4.2', function() {
		var expr = "(+ 2.1 2.1)";
		var result = "4.2";
		modelInstance = new CalcModel(expr);

		expect(modelInstance.evaluate()).toBe(result);
	});

	it('(+ 2.1.2 2.1) == invalid', function() {
		var expr = "(+ 2.1.2 2.1)";
		var result = "invalid";
		modelInstance = new CalcModel(expr);

		expect(modelInstance.evaluate()).toBe(result);
	});

	it('(+ 2 2)) == invalid', function() {
		var expr = "(+ 2 2))";
		var result = "invalid";
		modelInstance = new CalcModel(expr);

		expect(modelInstance.evaluate()).toBe(result);
	});

	it('(/ 2 0) == Infinity', function() {
		var expr = "(/ 2 0)";
		var result = "Infinity";
		modelInstance = new CalcModel(expr);

		expect(modelInstance.evaluate()).toBe(result);
	});


});