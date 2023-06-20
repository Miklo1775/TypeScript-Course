import { Base } from "./base.js";
import { Validatable, validate } from "../util/validation.js";
import { AutoBind } from "../decorators/autobind-decorator.js";
import { projectState } from "../state/project-state.js";

type AllOrNothing = [string, string, number] | void;

export class ProjectInput extends Base<HTMLDivElement, HTMLFormElement> {
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
