//void type
// function add(n1: number, n2: number) {
//   return n1 + n2;
// }
// //this function doesnt return anything so it is void
// //use void and not undefined if function doesn't return anything
// function printResult(num: number): void {
//   console.log("Result: " + num);
// }
// printResult(add(5, 12));
//undefined is a valid type in TS
// let someValue: undefined;
//functions as types
// function add(n1: number, n2: number) {
//   return n1 + n2;
// }
// //this function doesnt return anything so it is void
// //use void and not undefined if function doesn't return anything
// function printResult(num: number): void {
//   console.log("Result: " + num);
// }
// printResult(add(5, 12));
// //makes it clear that whatever we store in there is going to be a function
// // let combineValues: Function;
// //below we are saying that combineValues should take a function where the return type is a number the 2 parameters that are a number. syntax in arrow function
// let combineValues: (a: number, b: number) => number;
// combineValues = add;
// // combineValues = printResult;
// console.log(combineValues(8, 8));
//function types--callbacks
function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log("Result: " + num);
}
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
printResult(add(5, 12));
var combineValues;
combineValues = add;
console.log(combineValues(8, 8));
addAndHandle(10, 20, function (result) {
    console.log(result);
});
