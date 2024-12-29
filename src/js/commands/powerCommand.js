export default class PowerCommand {
	constructor(calculator, power) {
		this.calculator = calculator;
		this.power = power;
	}

	execute() {
		this.calculator.power(this.power);
	}
}
