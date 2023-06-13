//function overloads

// interface ErrorContainer {
//   [prop: string]: string;
// }

// const errorBolsa: ErrorContainer = {
//   email: "Not a valid email address",
//   username: "Must start with a capital letter",
// };

type Combinable = string | number;

//with function overloads, we use the function name(paramters): returnType
//So we tell TS that if we receive 2 numbers, the function will return a number, if its a string or a number, it will return a string, and if its 2 strings, it will return a string.

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

//we know that result is going to equal a string but TS doesn't know that hence why we cant use string methods on it. The type of result here is Combinable which means it could be a string or it could be a number

//one work around is by using type casting like below
// const result = add("Cats", "are fun") as String;
// result.split(" ");

//hovering over the add fucntion shows the amount of overloadss
const result = add("Cats", "are great");
result.split(" ");
