export default class Calculator {
	#actions = {
		"+": (first, second) => first + second,
		"-": (first, second) => first - second,
		"*": (first, second) => first * second,
		"/": (first, second) => {
			if (second === 0) {
				throw Error("You can not divide by 0");
			}

			return first / second;
		},
		"%": (first, second) => (first * second) / 100,
		sqrt: (first, second) => this.#extractRoot(second, first),
		"^": (first, second) => this.#power(first, second),
	};

	constructor() {
		this.previousValue = 0;
		this.currentValue = this.previousValue.toString();
		this.operator = "";
		this.memory = 0;
		this.history = [];
	}

	append(char) {
		if (this.currentValue.length >= 10) {
			throw new Error("The number is too big");
		}

		if (char === "." && this.currentValue.includes(".")) {
			return;
		}

		this.currentValue = this.currentValue + char;

		if (!this.currentValue.includes(".")) {
			this.#sanitizeCurrentOperand();
		}
	}

	setOperator(newOperator) {
		if (this.operator) {
			this.calculate();
		} else {
			this.previousValue = +this.currentValue;
		}

		this.operator = newOperator;
		this.currentValue = "0";
	}

	calculate() {
		if (!this.operator) {
			return;
		}

		const action = this.#actions[this.operator];

		if (!action) {
			throw new Error("This action is not supported");
		}

		const currentOperand = +this.currentValue;
		this.previousValue = action(this.previousValue, currentOperand);
		this.history.push(this.previousValue);
		this.currentValue = this.previousValue.toString();
		this.operator = "";
	}

	invert() {
		this.currentValue = this.currentValue.startsWith("-")
			? this.currentValue.substring(1)
			: `-${this.currentValue}`;
	}

	power(exponent) {
		const base = +this.currentValue;
		this.currentValue = this.#power(base, exponent);
	}

	extractRoot(degree) {
		const base = +this.currentValue;
		this.currentValue = this.#extractRoot(base, degree);
	}

	reciprocate() {
		const currentValue = +this.currentValue;
		this.currentValue = this.#reciprocate(currentValue).toString();
	}

	clear() {
		this.previousValue = 0;
		this.currentValue = "0";
		this.operator = "";
		this.history = [];
	}

	exponentiate(base) {
		const currentValue = +this.currentValue;
		this.currentValue = this.#power(base, currentValue).toString();
	}

	factorial() {
		let currentValue = +this.currentValue;

		if (currentValue > 150) {
			throw new Error("The number is too big");
		}

		if (currentValue < 0) {
			throw new Error("The number must be > 0");
		}
		let result = 1;
		for (let i = 2; i <= currentValue; i++) {
			result = result * i;
		}

		this.currentValue = result.toString();
	}

	memoryAdd() {
		this.memory += +this.currentValue;
	}

	memorySubtract() {
		this.memory -= +this.currentValue;
	}

	memoryClear() {
		this.memory = 0;
	}

	memoryRecall() {
		this.currentValue = this.memory.toString();
	}

	undo() {
		if (!this.history.length) {
			return;
		}

		this.currentValue = this.history.pop();
	}

	#power(base, exponent) {
		if (exponent === 0) {
			return 1;
		}

		if (base === 0 && exponent > 0) {
			return 0;
		}

		if (Number.isInteger(exponent)) {
			return this.#intPower(base, exponent);
		}

		const wholePart = this.#floor(exponent);
		const fractionalPart = exponent - wholePart;

		const wholeResult = this.#intPower(base, wholePart);
		const fractionalResult = this.#fractionalPower(base, fractionalPart);

		return this.#roundNearInteger(wholeResult * fractionalResult);
	}

	#intPower(base, exponent) {
		let result = 1;
		if (exponent < 0) {
			base = 1 / base;
		}

		exponent = this.#abs(exponent);

		for (let i = 0; i < exponent; ++i) {
			result *= base;
		}

		return result;
	}

	#fractionalPower(base, exponent) {
		return this.#exp(exponent * this.#ln(base));
	}

	#extractRoot(number, degree) {
		return this.#power(number, this.#reciprocate(degree));
	}

	#abs(number) {
		return number < 0 ? -number : number;
	}

	#reciprocate(number) {
		return 1 / number;
	}

	#ln(number) {
		const EULER_CONST = 2.718281828459045;
		const TAYLOR_ITERATIONS = 50;

		if (number <= 0) {
			throw new Error("The number must be > 0");
		}

		let powerAdjust = 0;
		while (number > 1.0) {
			number /= EULER_CONST;
			powerAdjust++;
		}
		while (number < 0.25) {
			number *= EULER_CONST;
			powerAdjust--;
		}

		number -= 1.0;
		let t = 0.0,
			s = 1.0,
			z = number;
		for (let k = 1; k <= TAYLOR_ITERATIONS; k++) {
			t += (z * s) / k;
			z *= number;
			s = -s;
		}

		return t + powerAdjust;
	}

	#exp(number) {
		let result = 1;
		let term = 1;
		for (let i = 1; i <= 50; i++) {
			term *= number / i;
			result += term;
		}
		return result;
	}

	#roundNearInteger(number, precision = 0.0000000001) {
		let fractionalPart = number - this.#floor(number);
		if (fractionalPart < precision) {
			return this.#floor(number);
		}

		if (fractionalPart > 1 - precision) {
			return this.#ceil(number);
		}

		return number;
	}

	#floor(number) {
		return number < 0 ? -(-number | 0) : number | 0;
	}

	#ceil(number) {
		return this.#floor(number) + 1;
	}

	#sanitizeCurrentOperand() {
		this.currentValue = (+this.currentValue).toString();
	}
}
