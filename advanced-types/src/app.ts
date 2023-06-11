//Discriminated Unions

type Admin = {
  name: string;
  privilege: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Me",
  privilege: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

const printEmployeeInfo = (employee: UnknownEmployee) => {
  console.log("Name: " + employee.name);

  if ("privilege" in employee) {
    console.log("Privilege: " + employee.privilege);
  }

  if ("startDate" in employee) {
    console.log("Start Date: " + employee.startDate);
  }
};

printEmployeeInfo(e1);

class Car {
  drive() {
    console.log("driving");
  }
}

class Truck {
  drive() {
    console.log("driving...");
  }

  loadCargo(amount: number) {
    console.log("loading cargo" + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
  vehicle.drive();

  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }

  if (vehicle instanceof Car) {
    console.log("Me is Car vroom vroom");
  }
};

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: "bird"; //this is a literal type.
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

// const moveAnimal = (animal: Animal) => {

//     //the below code will definitely work but what if we get more animals?????

//   if ("flyingSpeed" in animal) {
//     console.log("Moving with speed: " + animal.flyingSpeed);
//   }

//   if ("runningSpeed" in animal) {
//     console.log("Moving with speed: " + animal.runningSpeed);
//   }
// };

const moveAnimal = (animal: Animal) => {
  //so each animal will have a type property of either bird or horse in this scenario.
  //we then use an switch statement to check the animals type. Outside of the switch, we initialize a variable named speed to set the speed depending on the animal type.
  //Finally we then console.log a message with the appropriate speed
  let speed;

  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }

  console.log("Moving at speed: " + speed);
};

moveAnimal({ type: "bird", flyingSpeed: 100 });
moveAnimal({ type: "horse", runningSpeed: 200 });

//in summary, we know that interfaces force us to use the properties and types. TypeScript also knows that in the example above, there will only ever be 2 different cases unless we add more to them. Instead of checking if a certain property exists or if there is an instance, we use types since we already know that every animal has to have a type
