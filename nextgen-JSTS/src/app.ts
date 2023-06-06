const userName = "Me";

let age = 27;

age = 28;

// function add(a: number, b: number) {
//   let result;
//   result = a + b;
//   return result;
// }

// if (age > 20) {
//   // var isOld = true; //not a blocked scoped variable
//   //   let isOld = true; //a blocked scoped variable
// }

// // console.log(isOld);

const add = (a: number, b: number) => {
  let result;
  result = a + b;
  return result;
};

const printOutput: (a: number | string) => void = (output) => {
  console.log(output);
};

const button = document.querySelector("button");

if (button) {
  button.addEventListener("click", (event) => console.log(event));
}

printOutput(add(5, 2));
