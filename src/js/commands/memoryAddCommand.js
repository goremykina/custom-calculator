export default class MemoryAddCommand {
	constructor(calculator) {
		this.calculator = calculator;
	}

	execute(currentValue) {
		this.calculator.memoryAdd(currentValue);
	}
}
