export class AddCommand {
	constructor(valueToAdd) {
		this.valueToAdd = valueToAdd;
	}

	execute(currentValue) {
		return currentValue + this.valueToAdd;
	}
}

export class SubtractCommand {
	constructor(valueToSubtract) {
		this.valueToSubtract = valueToSubtract;
	}

	execute(currentValue) {
		return currentValue - this.valueToSubtract;
	}
}

export class MultiplyCommand {
	constructor(valueToMultiply) {
		this.valueToMultiply = valueToMultiply;
	}

	execute(currentValue) {
		return currentValue * this.valueToMultiply;
	}
}

export class DivideCommand {
	constructor(valueToDivide) {
		this.valueToDivide = valueToDivide;
	}

	execute(currentValue) {
		return currentValue / this.valueToDivide;
	}
}
