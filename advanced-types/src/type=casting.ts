//Type Casting

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
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

// };

const moveAnimal = (animal: Animal) => {
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

//below typescrpt knows that itll be a paragraph element
// const paragraph = document.querySelector("p");

//below typescript doesnt know which element exactly. All it knows is that it could be an HTML element
// const paragraph = document.getElementById("message-output");

//below typescript doesnt know if the element exists, so we need to add the exclamation point to tell typescript that it does. Then after, it doesnt know if .value exists on the element because of the generic type Any.

//we have to tell typescript that it of type HTMLInputElement. There are 2 ways and they work the same. First way is by angle brackets and the html element type in between them. The second way is by putting as HTMLInputElement after the exclamation point
// const userInputElement = <HTMLInputElement>(
//   document.getElementById("user-input")!
// );

const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement;

userInputElement.value = "Hello";

//in summary, we use typecasting to tell typescript what the type of HTML element it is. We are given 2 ways to tell typescript. One way is <html element type> and the other way is as HTMLElement. The exclamation point tells typescript that the element will never yield null. If you dont't know if the value will return null, we would have to remove the typecasting and do if checks like below:

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi there";
}
