export default class ReciprocateCommand {
	constructor(calculator) {
		this.calculator = calculator;
	}

	execute() {
		this.calculator.reciprocate();
	}
}
