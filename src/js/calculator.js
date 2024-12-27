export default class Calculator {
	constructor(initialValue) {
		this.value = initialValue;
	}

	execute(command) {
		this.value = command.execute(this.value);
	}
}
