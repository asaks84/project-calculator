const display = document.querySelector("#display")
const calcButtons = document.querySelectorAll(".btn");
const dataCalculator = {};
const displayLimit = 12;

let hasOperated = false;
let lastClick = '';



// ###### MATH OPERATIONS & CALC FUNCTION ######

const add = (a, b) => (a + b);
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b);

function operate() {
    // Don't execute operations without 2 numbers
    if ((!dataCalculator.number1) || (!dataCalculator.number2)) return

    if (dataCalculator.operation == "+") dataCalculator.result = add(dataCalculator.number1, dataCalculator.number2);
    if (dataCalculator.operation == "-") dataCalculator.result = subtract(dataCalculator.number1, dataCalculator.number2);
    if (dataCalculator.operation == "/") dataCalculator.result = divide(dataCalculator.number1, dataCalculator.number2);
    if (dataCalculator.operation == "*") dataCalculator.result = multiply(dataCalculator.number1, dataCalculator.number2);

    // continue operating after a result
    dataCalculator.number1 = dataCalculator.result;
    delete dataCalculator.number2;
    hasOperated = true;

    // set result digits limit
    while (dataCalculator.result.toString().length > displayLimit) {
        dataCalculator.result = backspace(dataCalculator.result);
    };

    printOnDisplay(dataCalculator.result);
};



// #### VERIFICATION TESTS #####

const isNumberRegistred = () => (displayContent() == dataCalculator.number1);
const isDisplayLimit = (data) => ((displayContent() + data).length > displayLimit);
const isSameOperator = (last, curr) => last == curr;
const identifyElement = (str, data) => str.toString().indexOf(`${data}`);

function isLastDataOperator(last, current) {
    if (!last) return false;
    return last.classList.contains('operator') && current.classList.contains('operator');
};



//### BACKGROUND FUNCTIONS ####

function insertData() {
    if (!dataCalculator.number1) {
        dataCalculator.number1 = Number(displayContent());
    } else {
        dataCalculator.number2 = Number(displayContent());
    };
    operate()
};

function clearData() {
    Object.keys(dataCalculator).forEach(key => delete dataCalculator[key])
};

function calcPercentage() {
    printOnDisplay(displayContent() / 100);
};

// Invert Signal
const addSignal = (data) => data = "-" + displayContent();
const removeSignal = (data) => data.slice(1);

function invertSignal() {
    let displayStr = displayContent();
    if(identifyElement(displayStr, '-') == '-1'){
        printOnDisplay(addSignal(displayStr));
    } else printOnDisplay(removeSignal(displayStr));
};



// ##### DISPLAY FUNCTIONS #####

const displayContent = () => display.textContent;

function clearDisplay() {
    printOnDisplay();
};

function backspace(str) {
    if (!str) str = displayContent()
    return str.toString().slice(0, -1);
};

function printOnDisplay(data) {
    if (!data) data = '';
    display.textContent = data;
};



// ####### MAIN FUNCTION #######

function calculator(clicked) {
    const btnClicked = clicked.target.getAttribute('data-value');
    const btn = clicked.target;

    // clear 
    if (btnClicked == 'clear') {
        clearDisplay();
        clearData();
        return
    };

    // backspace and if it's operated, backspace will clear display only
    if (btnClicked == 'backspace' && hasOperated == true) {
        clearDisplay();
        return
    } else if (btnClicked == 'backspace') {
        printOnDisplay(backspace());
        return
    };

    // percentage
    if (btnClicked == '%') {
        calcPercentage()
        return
    }

    // invert Signal
    if (btnClicked == 'invert') {
        invertSignal();
        return
    };

    // operator functions
    // change operation signal and don't operate
    if (isLastDataOperator(lastClick, btn) && isSameOperator(lastClick, btn) == false) {
        dataCalculator.operation = btnClicked;
        return
    };
    lastClick = btn;

    if (btn.classList.contains('operator')) {
        insertData(btnClicked);
        dataCalculator.operation = btnClicked;
        return
    };

    // do not input more than 1 dot.
    if (btnClicked == '.') {
        if (identifyElement(displayContent(),".") != '-1') {
            return
        };
    };

    // the equal button function
    if (btnClicked === "result") {
        insertData(btnClicked);
        clearData();
    } else {
        // clear display to insert new numbers after operated
        if (isNumberRegistred() || hasOperated == true) {
            printOnDisplay();
        };

        // don't add more digits than display limit number
        if (isDisplayLimit(btnClicked)) return

        printOnDisplay(displayContent() + btnClicked);
        hasOperated = false;
    };
};

// ####### Using keyboard #######
// Need to block the browser shortcuts control before start this
//
// function controls(e) {
//     const control = document.querySelector(`div[data-key="${e.keyCode}"]`);
//     console.log(e.key, control);
//     if (!control) return;
//     control.click();
// };
//window.addEventListener('keydown', controls);

calcButtons.forEach(e => e.addEventListener('click', calculator));