
function add(num1, num2){
    return parseFloat((parseFloat(num1) + parseFloat(num2)).toFixed(5));
}

function subtract(num1, num2){
    return parseFloat((num1 - num2).toFixed(5));
}

function multiply(num1, num2){
    return parseFloat((num1 * num2).toFixed(5));
}

function divide(num1, num2){
    if (num2 == 0){
        return "Undefined";
    }
    return parseFloat((num1 / num2).toFixed(5));
}

function operate(operator, num1, num2){
    return operator(num1, num2);
}

const chosennumber = document.querySelectorAll(".numbers");
const displaynumber = document.getElementById("display");
const deletebutton = document.getElementById("delete");
const clearbutton = document.getElementById("clear");
const negativebutton = document.getElementById("negative");
const operatorbutton = document.querySelectorAll(".operators");
const equalbutton = document.getElementById("equalbutton");
window.addEventListener('keydown',keyboardInput);

let firstNumber = null;
let currentOperation = null;
let secondNumber = null;
let sign = true;

chosennumber.forEach((number)=>
    number.addEventListener('click',() => displayNumber(number.textContent))
);

operatorbutton.forEach((button) => 
    button.addEventListener('click', () => proceedOperation(button.textContent))
);

function proceedOperation(operation){
    if (firstNumber == null){
        firstNumber = displaynumber.textContent;
        displaynumber.textContent = operation;
        currentOperation = operation;
    }
    else if (firstNumber !== null && secondNumber == null && displaynumber.textContent !== '*' && displaynumber.textContent !== '/' && displaynumber.textContent != '-' && displaynumber.textContent != '+'){
        if (currentOperation == '+'){
            firstNumber = operate(add, firstNumber, displaynumber.textContent);
        }
        else if (currentOperation == '-'){
            firstNumber= operate(subtract, firstNumber, displaynumber.textContent);
        }
        else if (currentOperation == '*'){
            firstNumber = operate(multiply, firstNumber, displaynumber.textContent);
        }
        else if (currentOperation == '/'){
            firstNumber = operate(divide, firstNumber, displaynumber.textContent);
        }
        secondNumber = null;
        displaynumber.textContent = operation;
        currentOperation = operation;
    }

    else {
        displaynumber.textContent = operation;
        currentOperation = operation;
    }
}

equalbutton.addEventListener('click',equalButtonFunc);
deletebutton.addEventListener('click',() => deleteNumber());
clearbutton.addEventListener('click',clearDisplay);
negativebutton.addEventListener('click',changeSign);

function displayNumber(number){
    if (displaynumber.textContent === '0' || displaynumber.textContent === '*' || displaynumber.textContent === '/' || displaynumber.textContent === '+' || displaynumber.textContent === '-'){
        displaynumber.textContent = '';
    }
    else if (firstNumber !== null && secondNumber !== null){
        displaynumber.textContent = '';
    }
    displaynumber.textContent += number;
}

function deleteNumber(number){
    if (displaynumber.textContent !== null && (displaynumber.textContent).length > 1){
        displaynumber.textContent = displaynumber.textContent.toString().slice(0, -1);
    }
    else {
        displaynumber.textContent = 0;
    }
}

function clearDisplay(){
    displaynumber.textContent = '0';
    firstNumber = null;
    currentOperation = null;
    secondNumber = null;
}

function changeSign(){
    if (displaynumber.textContent !== null && displaynumber.textContent !== 0 && displaynumber.textContent !== '*' && displaynumber.textContent !== '/' && displaynumber.textContent != '-' && displaynumber.textContent != '+'){
        displaynumber.textContent = displaynumber.textContent * -1;
    }
}

function equalButtonFunc(){
    if (firstNumber !== null && currentOperation !== null && secondNumber == null){
         secondNumber = displaynumber.textContent;
     }
    if (firstNumber !== null && currentOperation !== null && secondNumber !== null){
        if (currentOperation == '+'){
            displaynumber.textContent = operate(add, firstNumber, secondNumber);
        }
        else if (currentOperation == '-'){
            displaynumber.textContent = operate(subtract, firstNumber, secondNumber);
        }
        else if (currentOperation == '*'){
            displaynumber.textContent = operate(multiply, firstNumber, secondNumber);
        }
        else if (currentOperation == '/'){
            displaynumber.textContent = operate(divide, firstNumber, secondNumber);
        }
    }
    else{
        return;
    }
}

function keyboardInput(e){
    if (e.key >= 0 && e.key <= 9 || e.key == '.'){
        displayNumber(e.key);
    }
    if (e.key === '='){
        equalButtonFunc();
    }
    if (e.key === 'Backspace' || e.key === 'd'){
        deleteNumber();
    }
    if (e.key === 'Escape' || e.key === 'c'){
        clearDisplay();
    }
    if (e.keyCode === 13){
        equalButtonFunc();
    }
    if (e.key === '*' || e.key === '/' || e.key === '-' || e.key == '+'){
        proceedOperation(e.key);
    }
}

