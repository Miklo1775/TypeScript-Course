// const person: {
//   name: string;
//   age: number;
// } = {
//   name: "Me",
//   age: 27,
// };

//working with tuples below
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string]; //tuple type
// } = {
//   name: "Me",
//   age: 27,
//   hobbies: ["learning", "cooking"],
//   role: [2, "author"],
// };

//enums makes below easier
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2

// enum Role {
//     ADMIN //0
//     READ_ONLY, //1
//     AUTHOR, //2
//   }

// enum Role {
//   ADMIN = "ADMIN",
//   READ_ONLY = 100,
//   AUTHOR = 200,
// }

enum Role {
  ADMIN = 5, //5
  READ_ONLY, //6
  AUTHOR, //7
}

const person = {
  name: "Me",
  age: 27,
  hobbies: ["learning", "cooking"],
  role: Role.ADMIN,
};

//the syntax below tells JS that this will be an array of strings

//the .push method is an exception in TS
// person.role.push('admin')

//not allowed to reassing a tuple like this
// person.role = [0, 'admin', 'user']

let favoriteActivities: string[];

//any[] tells TS the array will contain a mix of types
// let favoriteActivities: any[];

favoriteActivities = ["sleeping"];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

if (person.role === Role.ADMIN) {
  console.log("is admin");
}
