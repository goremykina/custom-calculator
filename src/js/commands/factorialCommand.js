export default class FactorialCommand {
	constructor(calculator) {
		this.calculator = calculator;
	}

	execute() {
		this.calculator.factorial();
	}
}
