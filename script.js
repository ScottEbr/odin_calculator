const numberBtn = document.querySelectorAll('[data-number]')
const operatorBtn = document.querySelectorAll('[data-operator]')
const input = document.querySelector('.screen-input')
const mem = document.querySelector('.screen-mem')
const equal = document.querySelector('.equal-btn')
const clear = document.querySelector('.clear-btn')
const backspace = document.querySelector('.del-btn')
const decimal = document.querySelector('.decimal-btn')

var tempInput = 0
var memFirst = ""
var operator = ""
let newEntry = true

// To allow for users to use the calculator in the case of "operand", "operator", "equals" sequence
let lastOperand = "";
let lastOperator = "";

let afterEquals = false;


numberBtn.forEach(numberBtn => {
    numberBtn.addEventListener("click", () => {
        
        if (afterEquals) {clearCalc()}
        
        if (newEntry) {
            tempInput = numberBtn.innerHTML
            input.innerHTML = tempInput

            newEntry = false

        } else {
            tempInput += numberBtn.innerHTML
            input.innerHTML = tempInput

        }
        
    });
});

// ## Operator buttons currently functional

operatorBtn.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", () => {

        afterEquals = false;

        // First selection of the operator
        if (memFirst == '' && tempInput !== '') {
            operator = operatorBtn.innerHTML; 
            memFirst = tempInput; // moves temp to mem
            tempInput = ''; // resets temp - however will stay maintain UI out put

            mem.innerHTML = memFirst + ' ' + operator;
            return;
        }

        // Allows for change in operator
        if (memFirst !== '' && tempInput == '') {
            operator = operatorBtn.innerHTML;
            mem.innerHTML = memFirst + ' ' + operator;
            return
        }

        // Allows for calculation / chained calculation
        if (memFirst !== '' && tempInput !== '') {

            memFirst = calculation(memFirst, tempInput); 

            operator = operatorBtn.innerHTML;
            mem.innerHTML = memFirst + ' ' + operator;
            input.innerHTML = memFirst;
            return;
        }


    });
});

equal.addEventListener("click", () => {equalsHandle()});

function equalsHandle() {

    // Normal calc
    if (operator !== '' && tempInput !== '') {
        
        mem.innerHTML = memFirst + ' ' + operator + ' ' + input.innerHTML + ' =';

        const a = memFirst;
        const b = tempInput;

        lastOperand = b; // storing in case of repeat =
        lastOperator = operator;

        memFirst = calculation(memFirst, tempInput); 
        input.innerHTML = memFirst;
        afterEquals = true;
        return;
    }

    // Where user presses "=" again
    if (operator !== '' && tempInput == '' && lastOperand !== '') {
        lastOperator = operator;

        mem.innerHTML = memFirst + ' ' + operator + ' ' + lastOperand + ' ='

        memFirst = calculation(memFirst, lastOperand);
        input.innerHTML = memFirst;
        afterEquals = true;
        return;
    }

    // Where user presses "=" after operator
    if (operator !== '' && tempInput == '' && lastOperand == '') {
        lastOperand = memFirst;

        mem.innerHTML = memFirst + ' ' + operator + ' ' + lastOperand + ' ='

        memFirst = calculation(memFirst, lastOperand);
        input.innerHTML = memFirst;
        afterEquals = true;
        return;    
    }
}


function calculation(a, b) {
    newEntry = true;
    tempInput = '';

    if (operator == '÷') {
        return +a / +b
    } else if (operator == 'x') {
        return +a * +b
    } else if (operator == '-') {
        return +a - +b
    } else if (operator == '+') {
        return +a + +b
    } else {
        return
    }

}

clear.addEventListener("click", () => {clearCalc()});

function clearCalc() {
    memFirst = ""
    operator = ""
    lastOperand = ""
    lastOperator = ""
    mem.innerHTML = ""
    input.innerHTML = 0
    tempInput = 0
    afterEquals = false
    newEntry = true
}

backspace.addEventListener("click", () => {backspaceCalc()});

function backspaceCalc() {
    if (tempInput !== '') {
        tempInput = tempInput.slice(0, -1)
        input.innerHTML = tempInput
    }

}

decimal.addEventListener("click", () => {addDecimal()});

function addDecimal() {
    if (!tempInput == '' && !tempInput.includes('.')) {
        tempInput += decimal.innerHTML
        input.innerHTML = tempInput
    }

}