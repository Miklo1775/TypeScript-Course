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

//Drag and Drop interfaces

interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

//Base Class
abstract class Base<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  hostEl: T;
  element: U;

  constructor(templateId: string, hostElId: string, insertAtStart: boolean, newElementId?: string) {
    this.templateEl = <HTMLTemplateElement>document.getElementById(templateId)!;
    this.hostEl = <T>document.getElementById(hostElId)!;
    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = <U>importedNode.firstElementChild;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    this.hostEl.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectItem extends Base<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} people`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }
  @AutoBind
  dragEndHandler(_: DragEvent) {
    console.log("Drag has ended");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragstart", this.dragEndHandler);
  }
  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

enum Status {
  Active,
  Finished,
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

type Listener<T> = (item: T[]) => void;

class StateBase<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFunction: Listener<T>) {
    this.listeners.push(listenerFunction);
  }
}

class ProjectState extends StateBase<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numPeeps: number) {
    const newProject = new Project(Math.random().toString(), title, description, numPeeps, Status.Active);
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projId: string, newStatus: Status) {
    const project = this.projects.find((project) => project.id === projId);
    if (project && project.projectStatus !== newStatus) {
      project.projectStatus = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
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

class ProjectInput extends Base<HTMLDivElement, HTMLFormElement> {
  // templateEl: HTMLTemplateElement;
  // hostEl: HTMLDivElement;
  // element: HTMLFormElement;
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputEl = <HTMLInputElement>this.element.querySelector("#title")!;

    this.descriptionInputEl = <HTMLInputElement>this.element.querySelector("#description")!;

    this.peopleInputEl = <HTMLInputElement>this.element.querySelector("#people")!;

    this.configure();
    // this.attach();
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

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  // private attach() {
  //   this.hostEl.insertAdjacentElement("afterbegin", this.element);
  // }
  renderContent() {}
}

const projIn = new ProjectInput();

class ProjectList extends Base<HTMLDivElement, HTMLElement> implements DragTarget {
  // templateEl: HTMLTemplateElement;
  // hostEl: HTMLDivElement;
  // element: HTMLElement;
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    // this.templateEl = <HTMLTemplateElement>document.getElementById("project-list")!;
    // this.hostEl = <HTMLDivElement>document.getElementById("app")!;
    this.assignedProjects = [];

    // const importedNode = document.importNode(this.templateEl.content, true);
    // this.element = <HTMLElement>importedNode.firstElementChild;
    // this.element.id = `${this.type} - projects`;

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = <HTMLUListElement>this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const projId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(projId, this.type === "active" ? Status.Active : Status.Finished);
  }

  @AutoBind
  dragLeaveHandler(_: DragEvent) {
    const listEl = <HTMLUListElement>this.element.querySelector("ul");
    listEl.classList.remove("droppable");
  }

  private renderProjects() {
    const listEl = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`)!;
    listEl.innerHTML = "";
    for (const items of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, items);
    }
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + " PROJECTS";
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relProjs = projects.filter((project) => {
        if (this.type === "active") {
          return project.projectStatus === Status.Active;
        }

        return project.projectStatus === Status.Finished;
      });
      this.assignedProjects = relProjs;
      this.renderProjects();
    });
  }
  // private attach() {
  //   this.hostEl.insertAdjacentElement("beforeend", this.element);
  // }
}

const activeProjectsList = new ProjectList("active");
const finishedProjectsList = new ProjectList("finished");
