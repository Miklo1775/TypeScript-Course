// interface ValidatorConfig {
//   [property: string]: {
//     [validatableProperty: string]: string[];
//   };
// }

// const validators: ValidatorConfig = {};

// function Required(target: any, propName: string) {
//   validators[target.constructor.name] = {
//     ...validators[target.constructor.name],
//     [propName]: ["required"],
//   };
// }

// function PositiveNumber(target: any, propName: string) {
//   validators[target.constructor.name] = {
//     ...validators[target.constructor.name],
//     [propName]: ["positive"],
//   };
// }

// function validate(obj: any) {
//   const objValidator = validators[(obj.constructor, name)];
//   if (!objValidator) {
//     return true;
//   }

//   let isValid = true;

//   for (const prop in objValidator) {
//     for (const validator of objValidator[prop]) {
//       switch (validator) {
//         case "required":
//           isValid = isValid && !!obj[prop];
//           break;
//         case "positive":
//           isValid = isValid && obj[prop] > 0;
//           break;
//       }
//     }
//   }
//   return isValid;
// }

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const newMethod: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundedFunction = originalMethod.bind(this);
      return boundedFunction;
    },
  };
  return newMethod;
}

type AllOrNothing = [string, string, number] | void;

class ProjectInput {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLFormElement;
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    this.templateEl = <HTMLTemplateElement>document.getElementById("project-input")!;
    this.hostEl = <HTMLDivElement>document.getElementById("app")!;

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = <HTMLFormElement>importedNode.firstElementChild;
    this.element.id = "user-input";

    this.titleInputEl = <HTMLInputElement>this.element.querySelector("#title")!;

    this.descriptionInputEl = <HTMLInputElement>this.element.querySelector("#description")!;

    this.peopleInputEl = <HTMLInputElement>this.element.querySelector("#people")!;

    this.configure();
    this.attach();
  }

  private clearInputs() {
    this.titleInputEl.value = "";
    this.descriptionInputEl.value = "";
    this.peopleInputEl.value = "";
  }

  private gatherUserInput(): AllOrNothing {
    const enteredTitle = this.titleInputEl.value;
    const enteredDescription = this.descriptionInputEl.value;
    const enteredPeople = this.peopleInputEl.value;

    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPeople.trim().length === 0
    ) {
      alert("invalud input");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostEl.insertAdjacentElement("afterbegin", this.element);
  }
}

const projIn = new ProjectInput();
