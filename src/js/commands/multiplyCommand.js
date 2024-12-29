export default class MultiplyCommand {
	constructor(valueToMultiply) {
		this.valueToMultiply = valueToMultiply;
	}

	execute(currentValue) {
		return currentValue * this.valueToMultiply;
	}
}
