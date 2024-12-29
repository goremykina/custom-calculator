export default class AddCommand {
	constructor(valueToAdd) {
		this.valueToAdd = valueToAdd;
	}

	execute(currentValue) {
		return currentValue + this.valueToAdd;
	}
}
