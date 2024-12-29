export default class SquareRootCommand {
	constructor(valueToSquareRoot) {
		this.valueToSquareRoot = valueToSquareRoot;
	}

	execute(currentValue) {
		if (currentValue === 0) {
			currentValue = this.valueToSquareRoot;
		}
		console.log(currentValue);
		if (currentValue < 0) {
			throw new Error(
				"Квадратный корень от отрицательного числа невозможен",
			);
		}

		let value = currentValue / 2;
		for (let i = 0; i < 20; i++) {
			value = (value + currentValue / value) / 2;
		}
		return value;
	}
}
