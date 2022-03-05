const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const visor = document.querySelector(".visor");

var evalCalc = "";

// add event

numberButtons.forEach((button) => {
  button.addEventListener("click", addVisor);
});

operationButtons.forEach((button) => {
  button.addEventListener("click", addVisor);
});

equalsButton.addEventListener("click", equals);
allClearButton.addEventListener("click", allClear);
deleteButton.addEventListener("click", deleteLast);

// Add to visor
function addVisor(event) {
  switch (event.target.innerText) {
    case "÷":
      evalCalc += "/";
      break;
    case "x":
      evalCalc += "*";
      break;
    case "%":
      evalCalc = percentageOperations(evalCalc + "%");
      visor.innerText = evalCalc;
      equals();
      break;
    default:
      evalCalc += event.target.innerText;
  }
  if (event.target.innerText != "%") {
    visor.innerHTML += event.target.innerText;
  }
}

function equals() {
  let calc = eval(evalCalc);
  console.log(calc);
  visor.innerHTML = calc;
}

function allClear() {
  visor.innerHTML = "";
  evalCalc = "";
}

function deleteLast() {
  visor.innerHTML = visor.innerHTML.slice(0, -1);
  evalCalc = evalCalc.slice(0, -1);
}

function percentageOperations(operation) {
  let percentage = operation
    .split(/[\+\-\*\/]/g)
    .pop()
    .slice(0, -1);
  let rest = operation.replace(percentage + "%", "").slice(0, -1);

  let operator = operation.replace(percentage + "%", "").replace(rest, "");
  console.log({ percentage, rest, operator, operation });
  let finalResult = eval(rest);
  percentage = Number(percentage);
  switch (operator) {
    case "+":
      percentage = (percentage / 100) * finalResult;
      finalResult += percentage;
      break;
    case "-":
      percentage = (percentage / 100) * finalResult;
      finalResult -= percentage;
      break;
    case "*":
      percentage /= 100;
      finalResult *= percentage;
      break;
    case "/":
      percentage /= 100;
      finalResult /= percentage;
      break;
    default:
      finalResult = percentage / 100;
  }
  return finalResult;
}
