//this module is basically a summary/refresher

// const userName = "Me";

// let age = 27;

// age = 28;

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

// //default values have to be last in the list of parameters
// const add = (a: number, b: number = 5) => {
//   let result;
//   result = a + b;
//   return result;
// };

// const printOutput: (a: number | string) => void = (output) => {
//   console.log(output);
// };

// const button = document.querySelector("button");

// if (button) {
//   button.addEventListener("click", (event) => console.log(event));
// }

// printOutput(add(5, 2));

const hobbies = ["Sports", "Cooking"];

const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);

console.log(activeHobbies);

const person = {
  fname: "Me",
  age: 27,
};

//spread
//creating a copy of the person object using the spread operator
const copiedPerson = { ...person };

//below we are using rest parameters to dynamically get the input numbers.
//we have to declare that it will be a type array of numbers
// const add = (...numbers: number[]) => {
//   return numbers.reduce((curResult: number, curValue: number) => {
//     return curResult + curValue;
//   }, 0);
// };

//we could also do it with Tuples
const add = (...numbers: [number, number, number]) => {
  return numbers.reduce((curResult: number, curValue: number) => {
    return curResult + curValue;
  }, 0);
};

const addedNumbers = add(5, 10, 2);

//destructuring arrays and objects
//remembber, destructuring doesnt mutate the array
const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies, hobby1, hobby2);

//remmember, these are property names, not names that you come up with, but you can redeclare the name as below
const { fname: userName, age } = person;

console.log(userName, age);
