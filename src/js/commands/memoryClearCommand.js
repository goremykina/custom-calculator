export default class MemoryClearCommand {
	constructor(calculator) {
		this.calculator = calculator;
	}

	execute(currentValue) {
		this.calculator.memoryClear(currentValue);
	}
}
