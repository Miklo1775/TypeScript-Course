//Adding Multiple Decorators

function Logger(logString: string) {
  console.log("1");
  return function (constructor: Function) {
    console.log("4");
    console.log(logString);
    console.log(constructor);
  };
}

// function WithTemplate(template: string, hookId: string) {
//   console.log("2");
//   return function (constructor: any) {
//     console.log("3");
//     console.log("rendering template");
//     const hookEl = document.getElementById(hookId);
//     const p = new constructor();
//     if (hookEl) {
//       hookEl.innerHTML = template;
//       hookEl.querySelector("h1")!.textContent = p.name;
//     }
//   };
// }

//the decorator factories run first from top to bottom, then the deorators themselves run from bottom to top.

// @Logger("Logging Person")
// // @WithTemplate("<h1>My Person Object</h1>", "app")
// class Person {
//   name = "Miklo";

//   constructor() {
//     console.log("Creating person");
//   }
// }

// const person1 = new Person();
