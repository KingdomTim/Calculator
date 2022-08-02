const numbers = document.querySelectorAll('.number')
const equal = document.querySelector('.equal')
const clear = document.querySelector('.clear')
const operations = document.querySelectorAll('.operation')
const previousDisplay = document.querySelector('.previousDisplay')
const currentDisplay = document.querySelector('.currentDisplay')
const backspace = document.querySelector('.backspace')
const decimal = document.querySelector('.decimal')

// If a particular number, operation, or character is pressed on the keyboard, the function activates

window.addEventListener("keydown", keyPress)

// Default values of calculator

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

// Rounds numbers to 6th decimal place

function roundNumber (number) {
    return Math.round(number * 1000000) / 1000000
}

// Prevents user from using operations if Infinity is present
// Otherwise, once an operation is chosen, it is displayed on screen, and initial value becomes stored as the previous value

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

// Evaluates which operation was chosen, and calculates with said operation
// Number is rounded if decimals are present
// Operator is reset after calculation
// Displays error message is user divides by 0 

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

// Enters current value into display
// Prevents 0 from being repeatedly chosen if it is the first digit

function changeDisplay(number) {
    if (currentNumber[0] === "0" && number === "0") {
        return;
    } else if(currentNumber.length <=10 && currentNumber[0] !== 0) {
    currentNumber += number
    currentDisplay.textContent = previousNumber + " " + operator + currentNumber 
    }
}

// Resets entire calculator as if user refreshed the page

function ac() {
    currentNumber = ""
    previousNumber = ""
    operator = ""
    currentDisplay.textContent = "0"
    previousDisplay.textContent = previousNumber
}

// Allows user to backspace and delete an individual digit at a time from the current value

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

// Allows user to add a decimal to perform specific calculations

function addDecimal() {
    if (!currentNumber.includes(".")) {
        currentNumber += "."
        currentDisplay.textContent = previousNumber + " " + operator + currentNumber
    }
}

// Allows user to display numbers, decimals, and operations or fully clear calculator upon pressing respective keys on keyboard

function keyPress(e) {
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

// If a certain button is clicked on, its respective function will be activated  

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

