export default class UndoCommand {
	constructor(calculator) {
		this.calculator = calculator;
	}

	execute(currentValue) {
		this.calculator.undo(currentValue);
	}
}
