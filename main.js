const numbers = document.querySelectorAll('.number')
const equal = document.querySelector('.equal')
const clear = document.querySelector('.clear')
const operations = document.querySelectorAll('.operation')
const previousDisplay = document.querySelector('.previousDisplay')
const currentDisplay = document.querySelector('.currentDisplay')
const backspace = document.querySelector('.backspace')
const decimal = document.querySelector('.decimal')

window.addEventListener("keydown", handleKeyPress)

let currentNumber = ""
let previousNumber = ""
let operator = ""

function addNumbers(a,b) {
    return a + b
}

function subtractNumbers (a,b) {
    return a - b
}

function multiplyNumbers (a,b) {
    return a * b
}

function divideNumbers (a,b) {
    return a / b
}

function roundNumber (number) {
    return Math.round(number * 1000000) / 1000000
}

function operate (operation) {
if (currentNumber === Infinity) {
    currentNumber = ""
    previousNumber = ""
    operator = "" 
    return;} 
    operator = operation
    previousNumber = currentNumber
    currentDisplay.textContent = previousNumber + " " + operation
    currentNumber = " "
    previousDisplay.textContent = previousNumber
}

function equals () {

if (currentNumber != " ") {
    if (operator === "+") {
        previousNumber = Number(previousNumber)
        currentNumber = Number(currentNumber)
        previousDisplay.textContent = previousNumber + " + " + currentNumber
        currentNumber = addNumbers(previousNumber,currentNumber)
        currentNumber = roundNumber(currentNumber)
        currentDisplay.textContent = currentNumber
        operator = ""
    } else if (operator === "-") {
        previousDisplay.textContent = previousNumber + " - " + currentNumber
        currentNumber = subtractNumbers(previousNumber,currentNumber)
        currentNumber = roundNumber(currentNumber)
        currentDisplay.textContent = currentNumber 
        operator = ""
    } else if (operator === "x") {
        previousDisplay.textContent = previousNumber + " x " + currentNumber
        currentNumber = multiplyNumbers(previousNumber,currentNumber)
        currentNumber = roundNumber(currentNumber)
        currentDisplay.textContent = currentNumber 
        operator = ""
    } else if (operator === "÷") {
        previousDisplay.textContent = previousNumber + " ÷ " + currentNumber
        currentNumber = divideNumbers(previousNumber,currentNumber)
        currentNumber = roundNumber(currentNumber)
        currentDisplay.textContent = currentNumber 
        operator = ""
        if (currentNumber === Infinity) {
            currentDisplay.textContent = "Error!"
            operator = ""
            return;
        }
    }
}
}


function changeDisplay(number) {
    if (currentNumber[0] === "0" && number === "0") {
        return;
    } else if(currentNumber.length <=10 && currentNumber[0] !== 0) {
    currentNumber += number
    currentDisplay.textContent = previousNumber + " " + operator + currentNumber 
    }
}

function ac() {
    currentNumber = ""
    previousNumber = ""
    operator = ""
    currentDisplay.textContent = "0"
    previousDisplay.textContent = previousNumber
}

function removeDigit() {
    if (currentNumber !== " ") { 
    currentNumber = currentNumber.slice(0, -1)
    currentDisplay.textContent = previousNumber + " " + operator + " " + currentNumber
        if (currentNumber === "") {
            currentDisplay.textContent = "0"
        }
    }
    if (currentNumber === "" && previousNumber !== "" && operator === "") {
        previousNumber = previousNumber.slice(0, -1);
        currentDisplay.textContent = previousNumber + " " + operator + previousNumber;
    }
}

function addDecimal() {
    if (!currentNumber.includes(".")) {
        currentNumber += "."
        currentDisplay.textContent = previousNumber + " " + operator + currentNumber
    }
}

function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
      changeDisplay(e.key);
    }
    if (
      e.key === "Enter" ||
      (e.key === "=" && currentNumber != "" && previousNumber != "")
    ) {
      equals();
    }
    if (e.key === "+" || e.key === "-") {
      operate(e.key);
    }
    if (e.key === "x" || e.key === "*") {
      operate("x");
    }
    if (e.key === "/") {
        operate("÷")
    }
    if (e.key === ".") {
      addDecimal();
    }
    if (e.key === "Backspace") {
      removeDigit();
    }
    if (e.key === "c") {
        ac()
    }
}

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        changeDisplay(e.target.textContent)
    })
})

operations.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if (currentNumber != "" && operator === "") {
        operate(e.target.textContent)
    }})
})

equal.addEventListener("click", (e) => {
    if (currentNumber != "" && previousNumber != "") {
    equals(e.target.textContent)
    }
})

clear.addEventListener("click", (e) => {
    ac(e.target.textContent)
})

decimal.addEventListener("click", (e) => {
    addDecimal(e.target.textContent)
})

 backspace.addEventListener("click", (e) => {
     removeDigit(e.target.textContent)
})

