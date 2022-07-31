const numbers = document.querySelectorAll('.numbers')
const equal = document.querySelector('.equal')
const clear = document.querySelector('.clear')
const operations = document.querySelectorAll('.operations')
const previousDisplay = document.querySelector('.previousDisplay')
const currentDisplay = document.querySelector('.currentDisplay')
const miscallaneous = document.querySelectorAll('.miscallaneous')



let currentNumber = ""
let previousNumber = ""
let operator = ""

function addNumbers(a,b) {
    return a + b
}

function subtactNumbers (a,b) {
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
    previousDisplay.textContent = previousNumber + " " + operation
    currentNumber = ""
    currentDisplay.textContent = ""
    
}

function equals () {
    if (operator === "+") {
        currentDisplay.textContent = addNumbers(previousNumber,currentNumber)
        previousDisplay.textContent = previousNumber + " + " + currentNumber 
    } else if (operator === "-") {
        currentDisplay.textContent = subtractNumbers(previousNumber,currentNumber)
    } else if (operator === "x") {
        currentDisplay.textContent = multiplyNumbers(previousNumber,currentNumber) 
    } else if (operator === "/") {
        currentDisplay.textContent = divideNumbers(previousNumber,currentNumebr)
    }
}


function changeDisplay(number) {
    if(currentNumber.length <=9) {
    currentNumber += number
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
        operate(e.target.textContent)
    })
})

equal.addEventListener("click", (e) => {
    equals(e.target.textContent)
})

