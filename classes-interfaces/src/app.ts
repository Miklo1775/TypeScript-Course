//an interface describes the structure of an object

interface Greetable {
  name: string;

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
console.log(user1);
