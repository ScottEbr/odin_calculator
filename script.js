const numberBtn = document.querySelectorAll('[data-number]')
const operatorBtn = document.querySelectorAll('[data-operator]')
const input = document.querySelector('.screen-input')
const mem = document.querySelector('.screen-mem')

const calcHandle = new Array(3).fill("")

console.log(calcHandle[1])

numberBtn.forEach(numberBtn => {
    numberBtn.addEventListener("mousedown", () => {
        calcHandle[0] += numberBtn.innerHTML;
        console.log(calcHandle)
        input.innerHTML = calcHandle[0];
    });
});

operatorBtn.forEach(operatorBtn => {
    operatorBtn.addEventListener("mousedown", () => {
        calcHandle[1] = operatorBtn.innerHTML;
        console.log(calcHandle)
        mem.innerHTML = calcHandle[0] + ' ' + calcHandle[1];
    });
});