"use strict";
const userName = "Me";
let age = 27;
age = 28;
const add = (a, b) => {
    let result;
    result = a + b;
    return result;
};
const printOutput = (output) => {
    console.log(output);
};
const button = document.querySelector("button");
if (button) {
    button.addEventListener("click", (event) => console.log(event));
}
printOutput(add(5, 2));
//# sourceMappingURL=app.js.map