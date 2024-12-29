export default class InvertCommand {
	constructor(calculator) {
		this.calculator = calculator;
	}

	execute() {
		this.calculator.invert();
	}
}
