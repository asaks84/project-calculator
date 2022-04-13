// Create a new function operate that takes an operator and 2 numbers 
// and then calls one of the above functions on the numbers.

const display = document.querySelector("#display")
const calcButtons = document.querySelectorAll(".btn");
const dataCalculator = {};


/*###########################

###### MATH OPERATIONS ######
###### & CALC FUNCTION ######

###########################*/

function add(a, b) {
    return (a + b);
};
function subtract(a, b) {
    return (a - b);
};
function multiply(a, b) {
    return (a * b);
};
function divide(a, b) {
    return (a / b);
};

function operate() {
    if((!dataCalculator.number1) || (!dataCalculator.number2)) return

    if(dataCalculator.operator == "+") dataCalculator.result = add(dataCalculator.number1, dataCalculator.number2);
    if(dataCalculator.operator == "-") dataCalculator.result = subtract(dataCalculator.number1, dataCalculator.number2);
    if(dataCalculator.operator == "/") dataCalculator.result = divide(dataCalculator.number1, dataCalculator.number2);
    if(dataCalculator.operator == "*") dataCalculator.result = multiply(dataCalculator.number1, dataCalculator.number2);

    dataCalculator.number1 = dataCalculator.result;
    delete dataCalculator.number2;
    
    display.textContent = dataCalculator.result;
};

const goToOperate = () => (number1 in dataCalculator && number2 in dataCalculator && operator in dataCalculator);

const isdisplayPopulated = () => (display.textContent == dataCalculator.number1);
const isDisplayLimit = () => {

};

function insertData(value){
    if(!dataCalculator.number1) {
        dataCalculator.number1 = Number(display.textContent);
    } else {
        dataCalculator.number2 = Number(display.textContent);
    };
    if(!goToOperate) {
        return
    } else operate();
};

function populate(clicked){
    const btnClicked = clicked.target.getAttribute('data-value');
    const btn = clicked.target;

    if(btn.classList.contains('operator')){ 
        insertData(btnClicked);
        dataCalculator.operator = btnClicked;
        return
    };

    if(isdisplayPopulated()){
        display.textContent ="";
    };

    if(btnClicked === "result") {
        insertData(btnClicked);
        delete dataCalculator.number1;
    }else display.textContent += btnClicked;
};
calcButtons.forEach(e => e.addEventListener('click', populate));