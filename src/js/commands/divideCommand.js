export default class DivideCommand {
	constructor(valueToDivide) {
		this.valueToDivide = valueToDivide;
	}

	execute(currentValue) {
		return currentValue / this.valueToDivide;
	}
}
