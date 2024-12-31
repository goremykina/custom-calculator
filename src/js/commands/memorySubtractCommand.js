export default class MemorySubtractCommand {
	constructor(calculator) {
		this.calculator = calculator;
	}

	execute(currentValue) {
		this.calculator.memorySubtract(currentValue);
	}
}
