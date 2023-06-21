//Project State Management class

import { Project, Status } from "../models/project-model";

type Listener<T> = (item: T[]) => void;

class StateBase<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFunction: Listener<T>) {
    this.listeners.push(listenerFunction);
  }
}

export class ProjectState extends StateBase<Project> {
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
export const projectState = ProjectState.getInstance();
