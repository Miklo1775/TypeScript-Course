import { Base } from "./base";
import { AutoBind } from "../decorators/autobind-decorator";
import { DragTarget } from "../models/drag-drop-interfaces";
import { Project, Status } from "../models/project-model";
import { projectState } from "../state/project-state";
import { ProjectItem } from "./project-item";
export class ProjectList extends Base<HTMLDivElement, HTMLElement> implements DragTarget {
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
  // }('(
}
