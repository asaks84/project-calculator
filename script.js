// Create a new function operate that takes an operator and 2 numbers 
// and then calls one of the above functions on the numbers.

const display = document.querySelector("#display");
const displayContent = display.textContent;

const displayValues = {};


/*###########################

###### MATH OPERATIONS ######
##### AND CALC FUNCTION #####

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
    const tempArray = displayContent.split(" ");
    displayValues.number1 = Number(tempArray[0]);
    displayValues.number2 = Number(tempArray[2]);
    displayValues.operator = tempArray[1];

    if(displayValues.operator == "+") displayValues.result = add(displayValues.number1, displayValues.number2);
    if(displayValues.operator == "-") displayValues.result = subtract(displayValues.number1, displayValues.number2);
    if(displayValues.operator == "/") displayValues.result = divide(displayValues.number1, displayValues.number2);
    if(displayValues.operator == "*") displayValues.result = multiply(displayValues.number1, displayValues.number2);
    
    console.table(displayValues.result);
};

// Create the functions that populate the display when you click the number buttons… 
// you should be storing the ‘display value’ in a variable somewhere for use in the next step.

