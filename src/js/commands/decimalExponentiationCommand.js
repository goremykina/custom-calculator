export default class DecimalExponentiationCommand {
	constructor(calculator, base) {
		this.calculator = calculator;
		this.base = base;
	}

	execute() {
		this.calculator.exponentiate(this.base);
	}
}
