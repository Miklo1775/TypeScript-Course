//Returning and changing a Class in a Class Decorator

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super(); //we essentially save the original class by using Super
        console.log(args, "ARGS");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Miklo";

  constructor() {
    console.log("Creating person");
  }
}

const person1 = new Person();
