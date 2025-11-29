const numberBtn = document.querySelectorAll('[data-number]')
const operatorBtn = document.querySelectorAll('[data-operator]')
const input = document.querySelector('.screen-input')
const mem = document.querySelector('.screen-mem')
const equal = document.querySelector('.equal-btn')

// const calcHandle = new Array(4).fill("")

const calcHandle = [0, '', '', '', 0]

// [tempinput, meminput / equal (value), operation, second input(value), newentry=0/1]

// numberBtn.forEach(numberBtn => {
//     numberBtn.addEventListener("click", () => {
//         if (calcHandle[0] == '' && calcHandle[3] == 0) {
//             calcHandle[0] += numberBtn.innerHTML
//             console.log(calcHandle)
//             input.innerHTML = calcHandle[0]

//         } else if (calcHandle[0] !== '' && calcHandle[3] == 1) {
//             calcHandle[0] = ''
//             calcHandle[0] += numberBtn.innerHTML
//             console.log(calcHandle)
//             input.innerHTML = calcHandle[0]
//             calcHandle[3] = 0
//         } else {
//             calcHandle[0] += numberBtn.innerHTML
//             console.log(calcHandle)
//             input.innerHTML = calcHandle[0]
//         }
 
//     });
// });


numberBtn.forEach(numberBtn => {
    numberBtn.addEventListener("click", () => {
        if (calcHandle[4] == 0) {
            calcHandle[0] = ''
            calcHandle[0] += numberBtn.innerHTML 
            input.innerHTML = calcHandle[0]
            calcHandle[4] = 1
            console.log(calcHandle)
        } else {
            calcHandle[0] += numberBtn.innerHTML 
            input.innerHTML = calcHandle[0]
            console.log(calcHandle)
        }
        
    });
});

operatorBtn.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", () => {

        calcHandle[2] = operatorBtn.innerHTML; // need to fix if so it can change the operator in the mem.innerhtml. so this needs to be included when temp memory is blank

        if (calcHandle[1] == "" && calcHandle[3] == "" ) {
            calcHandle[1] = calcHandle[0];
            calcHandle[0] = "";

            mem.innerHTML = calcHandle[1] + ' ' + calcHandle[2];

            console.log(calcHandle)
        } else if (calcHandle[1] !== "" && calcHandle[3] == "" ) {
            calcHandle[3] = calcHandle[0];
            calcHandle[0] = "";
            console.log(calcHandle)

        } else {
            console.log(calcHandle)
        }
    });
});



equal.addEventListener("click", () => {equalsHandle()});

function equalsHandle() {  
    
    // early handle, if user presses equal before their second number. Still to be fixed.
    if (calcHandle[2] == '' && calcHandle[1] !== '') {
        calcHandle[2] = calcHandle[0];
        
        input.innerHTML = calculation(calcHandle[0],calcHandle[2]);
        calcHandle[0] = calculation(calcHandle[0],calcHandle[2]);   
        mem.innerHTML = calcHandle[0] + ' ' + calcHandle[1];
        calcHandle[3] = 1;


        console.log(calcHandle)

    } else {
        return
    }
}

function calculation(a, b) {
    if (calcHandle[1] == '÷') {
        return +a / +b
    } else if (calcHandle[1] == 'x') {
        return +a * +b
    } else if (calcHandle[1] == '-') {
        return +a - +b
    } else if (calcHandle[1] == '+') {
        return +a + +b
    } else {
        return
    }
}
