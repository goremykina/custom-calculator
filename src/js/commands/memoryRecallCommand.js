export default class MemoryRecallCommand {
	constructor(calculator) {
		this.calculator = calculator;
	}

	execute(currentValue) {
		this.calculator.memoryRecall(currentValue);
	}
}
