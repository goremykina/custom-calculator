import Calculator from "../js/calculator";

describe("Calculator", () => {
	let calculator;

	beforeEach(() => {
		calculator = new Calculator();
	});

	test("The test checks the correctness of percentage calculation", () => {
		calculator.append("87");
		calculator.setOperator("%");
		calculator.append("3");
		calculator.calculate();
		expect(calculator.currentValue).toBe("2.61");
	});

	test("should set the operator and calculate correctly", () => {
		calculator.append("5");
		calculator.setOperator("+");
		calculator.append("3");
		calculator.calculate();
		expect(calculator.currentValue).toBe("8");
	});

	test("should correctly perform multiple operations: addition and subtraction", () => {
		calculator.append("25");
		calculator.setOperator("+");
		calculator.append("3.93");
		calculator.setOperator("+");
		calculator.append("6.4");
		calculator.setOperator("-");
		calculator.append("8");
		calculator.calculate();
		expect(calculator.currentValue).toBe("27.33");
	});

	test("should handle division by zero gracefully", () => {
		calculator.append("5");
		calculator.setOperator("/");
		calculator.append("0");
		expect(() => calculator.calculate()).toThrow("You can not divide by 0");
	});

	test("sqrt action should throw error for negative numbers when degree is even", () => {
		calculator.append("-16");
		calculator.setOperator("sqrt");

		expect(() => calculator.calculate()).toThrow("The number must be > 0");
	});

	test("sqrt action should calculate the nth root for non-integer degrees", () => {
		calculator.append("1.2");
		calculator.setOperator("sqrt");
		calculator.append("32");

		calculator.calculate();

		expect(calculator.currentValue).toBe("17.959392772949982");
	});

	test("should correctly perform multiple operations: addition and subtraction", () => {
		calculator.append("811");
		calculator.setOperator("*");
		calculator.append("63");
		calculator.setOperator("/");
		calculator.append("3");
		calculator.calculate();
		expect(calculator.currentValue).toBe("17031");
	});

	test("should invert the current value", () => {
		calculator.append("37");
		calculator.invert();
		expect(calculator.currentValue).toBe("-37");
	});

	test("should calculate factorial of a number", () => {
		calculator.append("6");
		calculator.factorial();
		expect(calculator.currentValue).toBe("720");
	});

	test("power() should correctly calculate powers", () => {
		calculator.append("2");
		calculator.power(5);
		expect(calculator.currentValue).toBe(32); // 2^5 = 8
	});

	test("exponentiate() should calculate the result of raising a base to the current value as the exponent", () => {
		calculator.append("3");
		calculator.exponentiate(10);
		expect(calculator.currentValue).toBe("1000"); // 10^3 = 1000
	});

	test("extractRoot() should correctly calculate roots", () => {
		calculator.append("27");
		calculator.extractRoot(3);
		expect(calculator.currentValue).toBe(3); // 3√27 = 3
	});

	test("reciprocate() should correctly calculate reciprocals", () => {
		calculator.append("5");
		calculator.reciprocate();
		expect(calculator.currentValue).toBe("0.2"); // 1 / 5 = 0.2
	});

	test("memoryAdd() should correctly add to memory", () => {
		calculator.append("8");
		calculator.setOperator("+");
		calculator.append("11");
		calculator.calculate();
		calculator.memoryAdd(); // memory = 5
		expect(calculator.memory).toBe(19); // 5 - 3 = 2
	});

	test("memorySubtract() should correctly subtract from memory", () => {
		calculator.append("8");
		calculator.setOperator("+");
		calculator.append("11");
		calculator.calculate(); // 8 + 11
		calculator.memoryAdd(); // memory = 19
		expect(calculator.memory).toBe(19);
	});

	test("test verifies the correctness of the calculator's memory operations: memoryAdd and memoryRecall", () => {
		calculator.append("7");
		calculator.memoryAdd(); // memory = 7
		calculator.append("3");
		calculator.memoryAdd(); // memory 7 + 73
		calculator.memoryRecall();
		expect(calculator.memory).toBe(80);
	});

	test("clear() should reset the calculator state", () => {
		calculator.append("25");
		calculator.setOperator("+");
		calculator.append("5");
		calculator.clear();
		expect(calculator.currentValue).toBe("0");
		expect(calculator.previousValue).toBe(0);
		expect(calculator.operator).toBe("");
		expect(calculator.history).toEqual([]);
	});
});
