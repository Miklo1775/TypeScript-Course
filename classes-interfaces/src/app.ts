//an interface describes the structure of an object

interface Greetable {
  //readonly wont let you change the name property in this case wont change after initialization
  readonly name: string;

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
