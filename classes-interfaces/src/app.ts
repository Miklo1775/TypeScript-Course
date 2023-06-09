//interfaces are used during compilation to check code. JS doesnt have a translation for interfaces

interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string; //optional property
  //you can have optional properties in interfaces but also make it not optional in the class itself or you can have the property optional in both the interface and the class
}

//an interface describes the structure of an object

//extending/combining interfaces
//we can extend multiple interfaces as well. Just seperate the interfaces by a comma.
interface Greetable extends Named {
  //readonly wont let you change the name property in this case wont change after initialization

  greet(phrase: string): void;
}

//you can implement multiple interfaces seperated by a comma
class Person implements Greetable {
  name?: string; //we cnan also add optional properties on the class
  age = 30;
  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Howdy partna");
    }
  }
}

let user1: Greetable;

user1 = new Person();

user1.greet("Hi");
// user1.name = "victor";
console.log(user1);

// Wrap Up

//interfaces help bring your idea on how an object should be structured to your code. Types and interfaces CAN be used interchangeable a lot of the times but it is more common to use interfaces. Interfaces are used to check code during compilation but that is it. JS doesnt have a translation for interfaces.
