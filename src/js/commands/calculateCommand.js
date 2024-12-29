export default class CalculateCommand {
	constructor(calculator) {
		this.calculator = calculator;
	}

	execute() {
		this.calculator.calculate();
	}
}
