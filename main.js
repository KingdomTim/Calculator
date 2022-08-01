const numbers = document.querySelectorAll('.number')
const equal = document.querySelector('.equal')
const clear = document.querySelector('.clear')
const operations = document.querySelectorAll('.operation')
const previousDisplay = document.querySelector('.previousDisplay')
const currentDisplay = document.querySelector('.currentDisplay')
const backspace = document.querySelector('.backspace')
const decimal = document.querySelector('.decimal')



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

function operate (operation) {
    operator = operation
    previousNumber = currentNumber
    currentDisplay.textContent = previousNumber + " " + operation
    currentNumber = " "
    previousDisplay.textContent = previousNumber
}

function equals () {

if (currentNumber != "") {
    if (operator === "+") {
        previousNumber = Number(previousNumber)
        currentNumber = Number(currentNumber)
        currentDisplay.textContent = addNumbers(previousNumber,currentNumber)
        previousDisplay.textContent = previousNumber + " + " + currentNumber
        currentNumber = addNumbers(previousNumber,currentNumber)
    } else if (operator === "-") {
        currentDisplay.textContent = subtractNumbers(previousNumber,currentNumber)
        previousDisplay.textContent = previousNumber + " - " + currentNumber 
        currentNumber = subtractNumbers(previousNumber,currentNumber)
    } else if (operator === "x") {
        currentDisplay.textContent = multiplyNumbers(previousNumber,currentNumber)
        previousDisplay.textContent = previousNumber + " x " + currentNumber 
        currentNumber = multiplyNumbers(previousNumber,currentNumber)
    } else if (operator === "÷") {
        currentDisplay.textContent = divideNumbers(previousNumber,currentNumber)
        previousDisplay.textContent = previousNumber + " ÷ " + currentNumber 
        currentNumber = divideNumbers(previousNumber,currentNumber)
        if (currentNumber === Infinity) {
            currentDisplay.textContent = "Error!"
            currentNumber = ""
            previousNumber = ""
        }
    }
}
}


function changeDisplay(number) {
    if (currentNumber[0] === "0" && number === "0") {
        return;
    } else if(currentNumber.length <=9) {
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
    let arr = Array.from(String(currentNumber));
    let remove = arr.pop()
    currentNumber = arr
    currentDisplay.textContent = currentNumber
}

function addDecimal() {
    if (!currentNumber.includes(".")) {
        currentNumber += "."
        currentDisplay.textContent = currentNumber
    }
}

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        changeDisplay(e.target.textContent)
    })
})

operations.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if (currentNumber != "") {
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

// backspace.addEventListener("click", (e) => {
//     removeDigit(e.target.textContent)
// })

