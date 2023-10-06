let displayValue = "";

function checkInvalid(s) {
  // test if the input is valid
  // regex checks if there are 2 operators in a row
  // or if the last charater is an operator'
  return /[+\-*/]{2}|[^0-9]$/.test(s);
}
function calculateResult() {
  displayValue = calculatorParser(displayValue);
  updateDisplay();
}
function calculatorParser(s) {
  if (checkInvalid(s)) return "Error";
  let result = 0;
  let acc = 0;
  let curr = 0;
  let op = "+";

  for (let i = 0; i < s.length; i++) {
    const c = s[i]; // current character
    // handle multiple digits
    if (c >= "0" && c <= "9") {
      curr = curr * 10 + Number(c);
    }

    // if reach the end of the string or encounter an operator
    // Use includes to check operators and avoid or statements
    if (i === s.length - 1 || "+-*/".includes(c)) {
      if (op === "+") {
        result += acc;
        acc = curr;
      } else if (op === "-") {
        acc -= curr;
      } else if (op === "*") {
        acc *= curr;
      } else if (op === "/") {
        // check for division by 0
        if (curr === 0) return "Error";
        acc /= curr;
      }
      curr = 0;
      op = c;
    }
  }
  console.log(result, acc, curr, op);
  // add the last number to the result
  result += acc;
  return result;
}
function updateDisplay() {
  // if blank string reset it to 0
  if (displayValue.length < 1) {
    displayValue = "0";
  }
  document.getElementById("display").value = displayValue;
}

function appendToDisplay(value) {
  // overwrite 0s and errors with the new input or -
  // else if the next input is an operator,
  // or normal sequence append it
  if (displayValue === "0" && "+*/".includes(value)) {
    displayValue += value;
  } else if (displayValue === "Error" || displayValue === "0") {
    displayValue = value;
  } else {
    displayValue += value;
  }
  updateDisplay();
}

function clearDisplay() {
  displayValue = "";
  updateDisplay();
}
function clearEntry() {
  if (checkInvalid(displayValue)) {
    displayValue = "Error";
  } else {
    // gets the index of the last number and removes it
    // and operator before it from the string
    const lastElem = displayValue.match(/\d+$/);
    if (lastElem) {
      displayValue = displayValue.substring(0, lastElem.index - 1);
    }
  }
  updateDisplay();
}
