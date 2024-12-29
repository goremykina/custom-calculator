export default class AppendCommand {
	constructor(calculator, char) {
		this.char = char;
		this.calculator = calculator;
	}

	execute() {
		this.calculator.append(this.char);
	}
}
