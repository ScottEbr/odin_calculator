const numberBtn = document.querySelectorAll('[data-number]')
const operatorBtn = document.querySelectorAll('[data-operator]')
const input = document.querySelector('.screen-input')
const mem = document.querySelector('.screen-mem')
const equal = document.querySelector('.equal-btn')

var tempInput = 0
var memFirst = ""
var operator = ""
let newEntry = true

// To allow for users to use the calculator in the case of "operand", "operator", "equals" sequence
let lastOperand = "";
let lastOperator = "";


numberBtn.forEach(numberBtn => {
    numberBtn.addEventListener("click", () => {
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

    console.log("temp " + tempInput)
    console.log("mem " + memFirst)


    // Normal calc
    if (operator !== '' && tempInput !== '') {
        
        mem.innerHTML = memFirst + ' ' + operator + ' ' + input.innerHTML + ' =';

        const a = memFirst;
        const b = tempInput;

        lastOperand = b; // storing in case of repeat =
        lastOperator = operator;

        memFirst = calculation(memFirst, tempInput); 
        input.innerHTML = memFirst;
        return;
    }

    // #### start from here, which needs to be corrected. ####

    // Where user presses "=" immediately selecting operator
    if (operator == '' && tempInput == ''){
        lastOperand = memFirst;
        lastOperator = operator;

        repeatLastOperation();
        return;
    }

    // User presses "=" again

}


// #### This also needs to be fixed as well. ###
function repeatLastOperation () {
    if (memFirst == "" || lastOperand == "" || lastOperator == "") return;

    let a = memFirst;
    let b = lastOperand;

    memFirst = calculation(memFirst, lastOperand)


}

// function equalsHandle() {  
    
//     // early handle, if user presses equal before their second number. Still to be fixed.
//     if (calcHandle[2] == '' && calcHandle[1] !== '') {
//         calcHandle[2] = calcHandle[0];
        
//         input.innerHTML = calculation(calcHandle[0],calcHandle[2]);
//         calcHandle[0] = calculation(calcHandle[0],calcHandle[2]);   
//         mem.innerHTML = calcHandle[0] + ' ' + calcHandle[1];
//         calcHandle[3] = 1;


//         console.log(calcHandle)

//     } else {
//         return
//     }
// }

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
