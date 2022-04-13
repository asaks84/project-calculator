// Create a new function operate that takes an operator and 2 numbers 
// and then calls one of the above functions on the numbers.

const display = document.querySelector("#display")
const calcButtons = document.querySelectorAll(".btn");
const dataCalculator = {};
let lastClick = '';


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

/*###########################

#### VERIFICATION TESTS #####

###########################*/

const goToOperate = () => (number1 in dataCalculator && number2 in dataCalculator && operator in dataCalculator);

const isdisplayPopulated = () => (display.textContent == dataCalculator.number1);
const isDisplayLimit = (value) => ((display.textContent + value).length > 12);
const isSameOperator = (last, curr) => last == curr;

const isLastDataOperator = (last, current) => {
    if(!last) return false;
    return last.classList.contains('operator') && current.classList.contains('operator');
};

/*###########################

### BACKGROUND FUNCTIONS ####

###########################*/


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

/*###########################

##### DISPLAY FUNCTIONS #####

###########################*/

function clearData() {
    Object.keys(dataCalculator).forEach(key => delete dataCalculator[key])
};

function clearDisplay(){
    clearData();
    display.textContent = '';
};

function backspace() {
    display.textContent = display.textContent.slice(0,-1);
};

function populate(clicked){
    const btnClicked = clicked.target.getAttribute('data-value');
    const btn = clicked.target;

    if( isLastDataOperator(lastClick, btn) && isSameOperator(lastClick, btn) == false ) {
        dataCalculator.operator = btnClicked;
        return
    };
    lastClick = btn;

    if( btnClicked == 'clear' ){
        clearDisplay();
        return
    };
    if(btnClicked == 'backspace'){
        backspace();
        return
    };

    if(btn.classList.contains('operator')){ 
        insertData(btnClicked);
        dataCalculator.operator = btnClicked;
        return
    };

    if(isdisplayPopulated()){
        display.textContent ="";
    };

    if(isDisplayLimit(btnClicked)) return

    if(btnClicked === "result") {
        insertData(btnClicked);
        clearData();
    } else display.textContent += btnClicked;
};

calcButtons.forEach(e => e.addEventListener('click', populate));