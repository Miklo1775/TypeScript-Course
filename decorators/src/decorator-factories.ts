//decorator factory
//from what i am understanding, we can use the factory function to customize and create values that will be used by a decorator. This function will return an anonymous function which will be used as a decorator

function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger("Logging Person")
class Person {
  name = "Miklo";

  constructor() {
    console.log("Creating person");
  }
}

const person1 = new Person();

console.log(person1);
