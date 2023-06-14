//Built In Generics
// const names: Array<string> = ["chichi", "cheddar"]; //this syntax is exactly the same as string[]
// names[0].split(" ");

// //heres something i learned, a promise has a type. Below, the type is Promise is the type and we know that promise will return a string so we can set the the type of that Promise to a string.
// //This is useful because if we know what type of data we are working with, we'll have access to the methods such as string methods.
// //being able to set the type gives us type safety and allows TS to warn us if we make an error.
// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("This is done!");
//   }, 2000);
// });

// promise.then((data) => {
//   data.split(" ");
// });
