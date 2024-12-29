export default class SetOperatorCommand {
	constructor(calculator, operator) {
		this.calculator = calculator;
		this.operator = operator;
	}

	execute() {
		this.calculator.setOperator(this.operator);
	}
}
