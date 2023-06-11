// //Type Gaurds

// type Admin = {
//   name: string;
//   privilege: string[];
// };

// type Employee = {
//   name: string;
//   startDate: Date;
// };

// type ElevatedEmployee = Admin & Employee;

// const e1: ElevatedEmployee = {
//   name: "Me",
//   privilege: ["create-server"],
//   startDate: new Date(),
// };

// type Combinable = string | number;
// type Numeric = number | boolean;
// type Universal = Combinable & Numeric;

// function add(a: Combinable, b: Combinable) {
//   //below is whats known as a tyoe guard. It allows us to use the flexibility of union tpes.
//   //if any of the inputs is a string, it will enter the if statement and concatenate them. Otherwise if it receives both numbers, it wont enter the if statement and will return the sum of a and b
//   if (typeof a === "string" || typeof b === "string") {
//     return a.toString() + b.toString();
//   }
//   return a + b;
// }

// type UnknownEmployee = Employee | Admin;

// const printEmployeeInfo = (employee: UnknownEmployee) => {
//   console.log("Name: " + employee.name);

//   //the below type guard checks if the privilege property exists on the employee object. SO we are just checking if a property exists on the object and if it does, we'd enter the appropriate if statements.
//   //if the property doesn't exist, we dont do anything
//   if ("privilege" in employee) {
//     console.log("Privilege: " + employee.privilege);
//   }

//   if ("startDate" in employee) {
//     console.log("Start Date: " + employee.startDate);
//   }
// };

// printEmployeeInfo(e1);

// class Car {
//   drive() {
//     console.log("driving");
//   }
// }

// class Truck {
//   drive() {
//     console.log("driving...");
//   }

//   loadCargo(amount: number) {
//     console.log("loading cargo" + amount);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// const useVehicle = (vehicle: Vehicle) => {
//   vehicle.drive();
//   //instanceof is a vanilla JS operator. Below it checks if vehicle is basd off the Truck constructor
//   if (vehicle instanceof Truck) {
//     vehicle.loadCargo(1000);
//   }

//   if (vehicle instanceof Car) {
//     console.log("Me is Car vroom vroom");
//   }
// };

// useVehicle(v1);
// useVehicle(v2);

// //in summary, for types we can use typeof in guard checks, for objects we can use 'in', and for instances we can use instanceof
