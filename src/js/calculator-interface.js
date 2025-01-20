import Calculator from "./calculator";
import {
	AppendCommand,
	CalculateCommand,
	ClearCommand,
	ExtractRootCommand,
	InvertCommand,
	PowerCommand,
	ReciprocateCommand,
	MemoryAddCommand,
	MemoryClearCommand,
	MemoryRecallCommand,
	MemorySubtractCommand,
	SetOperatorCommand,
	FactorialCommand,
	DecimalExponentiationCommand,
	UndoCommand,
} from "./commands";

const calculator = new Calculator();
let currentEl = null;
let expressionEl = null;
const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const operators = new Set(["-", "+", "*", "/", "%", "^"]);
const operatorMappings = {
	"*": "×",
	"/": "÷",
	sqrt: "√",
};

function append(char) {
	const command = new AppendCommand(calculator, char);
	executeAndRender(command);
}

function calculate() {
	const command = new CalculateCommand(calculator);
	executeAndRender(command);
}

function setOperator(newOperator) {
	const command = new SetOperatorCommand(calculator, newOperator);
	executeAndRender(command);
}

function clearAll() {
	const command = new ClearCommand(calculator);
	executeAndRender(command);
}

function invertCurrentOperand() {
	const command = new InvertCommand(calculator);
	executeAndRender(command);
}

function renderDisplay() {
	if (calculator.currentValue.length >= 10) {
		currentEl.classList.add("compact");
	} else {
		currentEl.classList.remove("compact");
	}

	const formattedOperator =
		operatorMappings[calculator.operator] || calculator.operator;
	const formattedValue = calculator.operator ? calculator.previousValue : "";

	currentEl.textContent = calculator.currentValue;
	expressionEl.textContent = `${formattedValue} ${formattedOperator}`;
}

function reciprocate() {
	const command = new ReciprocateCommand(calculator);
	executeAndRender(command);
}

function executeAndRender(command) {
	try {
		command.execute();
		renderDisplay();
	} catch (error) {
		alert(error.message);
	}
}

function power(power) {
	const command = new PowerCommand(calculator, power);
	executeAndRender(command);
}

function extractRoot(degree) {
	const command = new ExtractRootCommand(calculator, degree);
	executeAndRender(command);
}

function factorial() {
	const command = new FactorialCommand(calculator);
	executeAndRender(command);
}

function exponentiate(base) {
	const command = new DecimalExponentiationCommand(calculator, base);
	executeAndRender(command);
}

function memoryClear() {
	const command = new MemoryClearCommand(calculator);
	executeAndRender(command);
}

function memoryRecall() {
	const command = new MemoryRecallCommand(calculator);
	executeAndRender(command);
}

function memoryAdd() {
	const command = new MemoryAddCommand(calculator);
	executeAndRender(command);
}

function memorySubtract() {
	const command = new MemorySubtractCommand(calculator);
	executeAndRender(command);
}

function undo() {
	const command = new UndoCommand(calculator);
	executeAndRender(command);
}

document.addEventListener("DOMContentLoaded", () => {
	currentEl = document.getElementById("current-operand-display");
	expressionEl = document.getElementById("expression-display");
	clearAll();
});

document.addEventListener("click", (event) => {
	const target = event.target;
	if (target.classList.contains("append")) {
		const value = target.dataset.value;
		append(value);
	}

	const targetOperator = event.target.closest(".setOperator");
	if (targetOperator) {
		const operator = targetOperator.dataset.value;
		setOperator(operator);
	}

	if (target.classList.contains("power")) {
		const value = target.dataset.value;
		power(value);
	}

	if (target.classList.contains("calculate")) {
		calculate();
	}

	if (target.classList.contains("memoryClear")) {
		memoryClear();
	}

	if (target.classList.contains("memoryAdd")) {
		memoryAdd();
	}

	if (target.classList.contains("memorySubtract")) {
		memorySubtract();
	}

	if (target.classList.contains("memoryRecall")) {
		memoryRecall();
	}

	if (target.classList.contains("undo")) {
		undo();
	}

	if (target.classList.contains("clearAll")) {
		clearAll();
	}

	const targetExtractRoot = event.target.closest(".extractRoot");
	if (targetExtractRoot) {
		const value = targetExtractRoot.dataset.value;
		extractRoot(value);
	}

	const targetReciprocate = event.target.closest(".reciprocate");
	if (targetReciprocate) {
		const value = targetReciprocate.dataset.value;
		reciprocate(value);
	}

	const targetExponentiate = event.target.closest(".exponentiate");
	if (targetExponentiate) {
		const value = targetExponentiate.dataset.value;
		exponentiate(value);
	}

	if (target.classList.contains("factorial")) {
		factorial();
	}

	if (target.classList.contains("invertCurrentOperand")) {
		invertCurrentOperand();
	}
});

document.addEventListener("keydown", (event) => {
	if (digits.has(event.key)) {
		append(event.key);
	} else if (event.key === "." || event.key === ",") {
		append(".");
	} else if (operators.has(event.key)) {
		setOperator(event.key);
	} else if (event.key === "=" || event.key === "Enter") {
		event.preventDefault();
		calculate();
	} else if (event.key === "Delete") {
		clearAll();
	}
});
