export default class SubtractCommand {
	constructor(valueToSubtract) {
		this.valueToSubtract = valueToSubtract;
	}

	execute(currentValue) {
		return currentValue - this.valueToSubtract;
	}
}
