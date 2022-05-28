function add(num1, num2){
    return parseFloat((parseFloat(num1) + parseFloat(num2)).toFixed(3));
}

function subtract(num1, num2){
    return parseFloat((num1 - num2).toFixed(3));
}

function multiply(num1, num2){
    return parseFloat((num1 * num2).toFixed(3));
}

function divide(num1, num2){
    if (num2 == 0){
        return "Undefined";
    }
    return parseFloat((num1 / num2).toFixed(3));
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
let lastButtonPressed;
let deletePressed = false;

chosennumber.forEach((number)=>
    number.addEventListener('click',() => displayNumber(number.textContent))
);

operatorbutton.forEach((button) => 
    button.addEventListener('click', () => proceedOperation(button.textContent))
);

function proceedOperation(operation){
    if (lastButtonPressed == 'o' && deletePressed == false){
        return;
    }
    else if (lastButtonPressed == 'o' && deletePressed == true){
        displaynumber.textContent += operation;
        currentOperation = operation;
        lastButtonPressed = 'o';
        return;
    }
    if (firstNumber == null){
        firstNumber = parseFloat(displaynumber.textContent);
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
        tempSecondNumber = parseFloat(displaynumber.textContent);
        if (currentOperation == '+'){
            if ((displayFullEquation('add',firstNumber, tempSecondNumber)).length > 13){
                displaynumber.textContent = operate(add, firstNumber, tempSecondNumber).toString();
            } else {
                displaynumber.textContent = displayFullEquation('add', firstNumber, tempSecondNumber);
            }
            firstNumber = operate(add, firstNumber, tempSecondNumber);
        }
        else if (currentOperation == '-'){ 
            if ((displayFullEquation('subtract',firstNumber, tempSecondNumber)).length > 13){
                displaynumber.textContent = operate(subtract, firstNumber, tempSecondNumber).toString();
            } else {
                displaynumber.textContent = displayFullEquation('subtract',firstNumber,tempSecondNumber);
            }
            firstNumber= operate(subtract, firstNumber, tempSecondNumber);
        }
        else if (currentOperation == '*'){
            if ((displayFullEquation('multiply',firstNumber, tempSecondNumber)).length > 13){
                displaynumber.textContent = operate(multiply, firstNumber, tempSecondNumber).toString();
            } else {
                displaynumber.textContent = displayFullEquation('multiply',firstNumber,tempSecondNumber);
            }
            firstNumber = operate(multiply, firstNumber, tempSecondNumber);
        }
        else if (currentOperation == '/'){
            if ((displayFullEquation('divide',firstNumber, tempSecondNumber)).length > 13){
                displaynumber.textContent = operate(divide, firstNumber, tempSecondNumber).toString();
            } else {
                displaynumber.textContent = displayFullEquation('divide',firstNumber,tempSecondNumber);
            }
            firstNumber = operate(divide, firstNumber, tempSecondNumber);
        }
        displaynumber.textContent += operation;
        currentOperation = operation;
    }
    else {
        displaynumber.textContent = operation;
        currentOperation = operation;
    }
    lastButtonPressed = 'o';
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
    lastButtonPressed = 'n';
}

function deleteNumber(number){
    // if (equalSignOne == true){
    //     clearDisplay();
    //     equalSignOne = false;
    // }
    if (displaynumber.textContent !== null && (displaynumber.textContent).length > 1 && lastButtonPressed == 'o'){
        displaynumber.textContent = displaynumber.textContent.toString().slice(0, -1);
        deletePressed = true;
    }
    else if (displaynumber.textContent !== null && (displaynumber.textContent).length > 1 && lastButtonPressed !== 'o'){
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
    lastButtonPressed = null;
}

function changeSign(){
    if (equalSignOne == true){
        return;
    }
    if (lastButtonPressed == 'o'){
        return;
    }
    if (displaynumber.textContent !== null && displaynumber.textContent !== 0 && displaynumber.textContent !== '*' && displaynumber.textContent !== '/' && displaynumber.textContent != '-' && displaynumber.textContent != '+'){
        displaynumber.textContent = displaynumber.textContent * -1;
    }
}

function equalButtonFunc(){
    if (equalSignOne == true){
        return;
    }
    if (firstNumber !== null && currentOperation !== null && secondNumber == null){
         secondNumber = parseFloat(displaynumber.textContent);
     }
    if (firstNumber !== null && currentOperation !== null && secondNumber !== null){
        equalSignOne = true;
        firstNumber = parseFloat(firstNumber);
        secondNumber = parseFloat(secondNumber);
        if (currentOperation == '+'){
            if ((displayFullEquation('add',firstNumber,secondNumber)).length > 13){
                displaynumber.textContent = operate(add, firstNumber, secondNumber).toString();
            } else {
                displaynumber.textContent = displayFullEquation('add',firstNumber, secondNumber);
            }
            firstNumber = operate(add, firstNumber, secondNumber);
            secondNumber = null;
        }
        else if (currentOperation == '-'){
            if ((displayFullEquation('subtract', firstNumber,secondNumber)).length > 13){
                displaynumber.textContent = operate(subtract, firstNumber, secondNumber).toString();
            } else {
                displaynumber.textContent = displayFullEquation('subtract',firstNumber, secondNumber);
            }
            firstNumber = operate(subtract, firstNumber, secondNumber);
            secondNumber = null;
        }
        else if (currentOperation == '*'){
            if ((displayFullEquation('multiply',firstNumber,secondNumber)).length > 13){
                displaynumber.textContent = operate(multiply, firstNumber, secondNumber).toString();
            } else {
                displaynumber.textContent = displayFullEquation('multiply', firstNumber, secondNumber);
            }
            firstNumber = operate(multiply, firstNumber, secondNumber);
            secondNumber = null;
        }
        else if (currentOperation == '/'){
            if ((displayFullEquation('divide',firstNumber,secondNumber)).length > 13){
                displaynumber.textContent = operate(divide, firstNumber, secondNumber).toString();
            } else {
                displaynumber.textContent = displayFullEquation('divide',firstNumber, secondNumber);
            }
            firstNumber = operate(divide, firstNumber, secondNumber);
            secondNumber = null;
        }
    }
    else{
        return;
    }
}

function displayFullEquation(operation, firstNumber, secondNumber){
    if (operation == 'add'){
        return parseFloat(firstNumber.toFixed(2)).toString() + currentOperation.toString() + parseFloat(secondNumber.toFixed(2)).toString() + "=" + operate(add, firstNumber, secondNumber).toString();
    }
    if (operation == 'subtract'){
        return parseFloat(firstNumber.toFixed(2)).toString() + currentOperation.toString() + parseFloat(secondNumber.toFixed(2)).toString() + "=" + operate(subtract, firstNumber, secondNumber).toString();
    }
    if (operation == 'multiply'){
        return parseFloat(firstNumber.toFixed(2)).toString() + currentOperation.toString() + parseFloat(secondNumber.toFixed(2)).toString() + "=" + operate(multiply, firstNumber, secondNumber).toString();
    }
    if (operation == 'divide'){
        return parseFloat(firstNumber.toFixed(2)).toString() + currentOperation.toString() + parseFloat(secondNumber.toFixed(2)).toString() + "=" + operate(divide, firstNumber, secondNumber).toString();
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
