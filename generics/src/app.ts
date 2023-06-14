//Creating a Generic Function

//so another difference from Maxs course and typescript 4.5...
//Below i needed to add <T extends {}, U> whereas Max only had to do <T, U>.
//Looks lijke that change was implemented after TypeScript 3.5.
//The change was that generic type parameters are implicity set to type unknown instead of object type {}

//Anyways, what we are saying below is that we dont know what the types of the object will be, but we do know that thet types of the 2 different parameters will be different.
//Now, the types arent set when we create the function, but are dynamically set when we invoke the function with the arguments.
function mergeObj<T extends {}, U>(a: T, b: U) {
  return Object.assign(a, b);
}

// console.log(mergeObj({ name: "victor" }, { age: 28 }));

// const merged = mergeObj({ name: "victor" }, { age: 28 });

//we can also tell TS what the types for T and U are such as below
const merged = mergeObj<{ name: string; hobbies: string[] }, { age: number }>(
  { name: "victor", hobbies: ["Learning"] },
  { age: 28 }
);

//we cant access the properties because TS doesn't know if they exist or not.
console.log(merged.name);
