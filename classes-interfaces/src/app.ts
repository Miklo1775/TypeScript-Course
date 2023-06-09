//an interface describes the structure of an object

interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: "Vic",
  age: 28,

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};

user1.greet("Hi");
