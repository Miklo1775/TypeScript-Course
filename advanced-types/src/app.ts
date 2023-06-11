//Intersection Types
//-allows us to combine other types

type Admin = {
  name: string;
  privilege: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// below we are combining type Admin and type Employee.
// We seperate the types with the ampersands symbol &

//in the case of object types, it will be the combination of properties
type ElevatedEmployee = Admin & Employee;

// here we define an object e1 with the intersected type ElevatedEmployee

const e1: ElevatedEmployee = {
  name: "Me",
  privilege: ["create-server"],
  startDate: new Date(),
};

//in the case of union types, it will combine the common types between the two union types. Below, both types share the type of number so it will be of type Universal = number
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;
//we can also do the same if it was an interface

// interface Admin {
//   name: string;
//   privilege: string[];
// }

// interface Employee {
//   name: string;
//   startDate: Date;
// }

// interface ElevatedEmployee extends Admin, Employee {}

// const e1: ElevatedEmployee = {
//   name: "Me",
//   privilege: ["create-server"],
//   startDate: new Date(),
// };
