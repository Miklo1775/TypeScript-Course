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

enum Status {
  Active,
  FInished,
}

//Project Type
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public projectStatus: Status
  ) {}
}

//Project State Management class

type Listener = (item: Project[]) => void;

class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFunction: Listener) {
    this.listeners.push(listenerFunction);
  }

  addProject(title: string, description: string, numPeeps: number) {
    const newProject = new Project(Math.random().toString(), title, description, numPeeps, Status.Active);
    this.projects.push(newProject);
    for (const listener of this.listeners) {
      listener(this.projects.slice());
    }
  }
}
const projectState = ProjectState.getInstance();

//validation

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
    isValid = isValid && validatableInput?.value.length > validatableInput?.minLength;
  }

  if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
    isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
  }

  if (validatableInput.min != null && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }

  if (validatableInput.max != null && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

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
    const enteredPeople = +this.peopleInputEl.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };
    console.log(validate(titleValidatable));
    console.log(validate(descriptionValidatable));
    console.log(validate(peopleValidatable));

    if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
      alert("invalid input");
      return;
    } else {
      console.log(validate(titleValidatable));

      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
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

class ProjectList {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    this.templateEl = <HTMLTemplateElement>document.getElementById("project-list")!;
    this.hostEl = <HTMLDivElement>document.getElementById("app")!;
    this.assignedProjects = [];

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = <HTMLElement>importedNode.firstElementChild;
    this.element.id = `${this.type} - projects`;

    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`)!;
    for (const items of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = items.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + " PROJECTS";
  }

  private attach() {
    this.hostEl.insertAdjacentElement("beforeend", this.element);
  }
}

const activeProjectsList = new ProjectList("active");
const finishedProjectsList = new ProjectList("finished");
