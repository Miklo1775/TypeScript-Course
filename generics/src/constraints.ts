//Working with Constraints

//kind of figured out contraints from the last lesson and typescript 4.5
//typename extends whatever type you want to constraint to.
//By default, the type is unknown.
function mergeObj<T extends {}, U extends {}>(a: T, b: U) {
  return Object.assign(a, b);
}

const merged = mergeObj<{ name: string; hobbies: string[] }, { age: number }>(
  { name: "victor", hobbies: ["Learning"] },
  { age: 28 }
);

console.log(merged.age);
