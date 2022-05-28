
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
let equationOne = false;
let equalSignOne = false;
let tempSecondNumber;

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
    else if (equalSignOne == true){
        displaynumber.textContent = firstNumber.toString() + operation.toString();
        equalSignOne = false;
        equationOne = true;
        currentOperation = operation;
    }
    else if (firstNumber !== null && secondNumber == null && displaynumber.textContent !== '*' && displaynumber.textContent !== '/' && displaynumber.textContent != '-' && displaynumber.textContent != '+'){
        equationOne = true;
        if (currentOperation == '+'){
            tempSecondNumber = displaynumber.textContent;
            displaynumber.textContent = firstNumber.toString() + currentOperation.toString() + displaynumber.textContent.toString() + "=" + operate(add, firstNumber, displaynumber.textContent).toString();
            firstNumber = operate(add, firstNumber, tempSecondNumber);
        }
        else if (currentOperation == '-'){ 
            tempSecondNumber = displaynumber.textContent;
            displaynumber.textContent = firstNumber.toString() + currentOperation.toString() + displaynumber.textContent.toString() + "=" + operate(subtract, firstNumber, displaynumber.textContent).toString();
            firstNumber= operate(subtract, firstNumber, tempSecondNumber);
        }
        else if (currentOperation == '*'){
            tempSecondNumber = displaynumber.textContent;
            displaynumber.textContent = firstNumber.toString() + currentOperation.toString() + displaynumber.textContent.toString() + "=" + operate(multiply, firstNumber, displaynumber.textContent).toString();
            firstNumber = operate(multiply, firstNumber, tempSecondNumber);
        }
        else if (currentOperation == '/'){
            tempSecondNumber = displaynumber.textContent;
            displaynumber.textContent = firstNumber.toString() + currentOperation.toString() + displaynumber.textContent.toString() + "=" + operate(divide, firstNumber, displaynumber.textContent).toString();
            firstNumber = operate(divide, firstNumber, tempSecondNumber);
        }
        displaynumber.textContent += operation;
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
    if (equalSignOne == true){
        clearDisplay();
    }
    if (equationOne == true || displaynumber.textContent === '0' || displaynumber.textContent === '*' || displaynumber.textContent === '/' || displaynumber.textContent === '+' || displaynumber.textContent === '-'){
        displaynumber.textContent = '';
        equationOne = false;
    }
    else if (firstNumber !== null && secondNumber !== null){
        displaynumber.textContent = '';
    }
    displaynumber.textContent += number;
}

function deleteNumber(number){
    if (equalSignOne == true){
        clearDisplay();
        equalSignOne = false;
    }
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
    equalSignOne = false;
    equationOne = false;
}

function changeSign(){
    if (equalSignOne == true){
        return;
    }
    if (displaynumber.textContent !== null && displaynumber.textContent !== 0 && displaynumber.textContent !== '*' && displaynumber.textContent !== '/' && displaynumber.textContent != '-' && displaynumber.textContent != '+'){
        displaynumber.textContent = displaynumber.textContent * -1;
    }
}

function equalButtonFunc(){
    if (firstNumber !== null && currentOperation !== null && secondNumber == null){
         secondNumber = displaynumber.textContent;
     }
    if (firstNumber !== null && currentOperation !== null && secondNumber !== null){
        equalSignOne = true;
        if (currentOperation == '+'){
            displaynumber.textContent = firstNumber.toString() + currentOperation.toString() + secondNumber.toString() + "=" + operate(add, firstNumber, secondNumber).toString();
            firstNumber = operate(add, firstNumber, secondNumber);
            secondNumber = null;
            //displaynumber.textContent = operate(add, firstNumber, secondNumber);
        }
        else if (currentOperation == '-'){
            displaynumber.textContent = firstNumber.toString() + currentOperation.toString() + secondNumber.toString() + "=" + operate(subtract, firstNumber, secondNumber).toString();
            firstNumber = operate(subtract, firstNumber, secondNumber);
            secondNumber = null;
            //displaynumber.textContent = operate(subtract, firstNumber, secondNumber);
        }
        else if (currentOperation == '*'){
            displaynumber.textContent = firstNumber.toString() + currentOperation.toString() + secondNumber.toString() + "=" + operate(multiply, firstNumber, secondNumber).toString();
            firstNumber = operate(multiply, firstNumber, secondNumber);
            secondNumber = null;
            //displaynumber.textContent = operate(multiply, firstNumber, secondNumber);
        }
        else if (currentOperation == '/'){
            displaynumber.textContent = firstNumber.toString() + currentOperation.toString() + secondNumber.toString() + "=" + operate(divide, firstNumber, secondNumber).toString()
            firstNumber = operate(divide, firstNumber, secondNumber);
            secondNumber = null;
            //displaynumber.textContent = operate(divide, firstNumber, secondNumber);
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

