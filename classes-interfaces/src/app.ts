interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name: string;
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
  name: string;
  age = 30;
  constructor(name: string) {
    this.name = name;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

let user1: Greetable;

user1 = new Person("Vic");

user1.greet("Hi");
// user1.name = "victor";
console.log(user1);
