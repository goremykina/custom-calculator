export default class ExtractRootCommand {
	constructor(calculator, degree) {
		this.calculator = calculator;
		this.degree = degree;
	}

	execute() {
		this.calculator.extractRoot(this.degree);
	}
}
