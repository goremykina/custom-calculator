import Calculator from "./calculator";
import {
	AppendCommand,
	CalculateCommand,
	ClearCommand,
	ExtractRootCommand,
	InvertCommand,
	PowerCommand,
	ReciprocateCommand,
} from "./commands";
import SetOperatorCommand from "./commands/setOperatorCommand";

const calculator = new Calculator();
let currentEl = null;
let expressionEl = null;
const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const operators = new Set(["-", "+", "*", "/", "%"]);
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
	if (calculator.currentValue.toString().length >= 10) {
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

window.setOperator = setOperator;
window.clearAll = clearAll;
window.invertCurrentOperand = invertCurrentOperand;
window.append = append;
window.calculate = calculate;
window.power = power;
window.reciprocate = reciprocate;
window.extractRoot = extractRoot;

document.addEventListener("DOMContentLoaded", () => {
	currentEl = document.getElementById("current-operand-display");
	expressionEl = document.getElementById("expression-display");
	clearAll();
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
