import { Point } from "../../../util";

export abstract class Command {
  private id: number;
  private wrapper: HTMLElement;
  private name: HTMLElement;
  private pos: Point;

  protected area: HTMLElement;

  constructor(pos: Point, id: number, parent: HTMLElement, name: string) {
    this.id = id;
    
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("command");
    this.pos = pos;
    this.setPos(pos);

    this.name = document.createElement("div");
    this.name.textContent = name;
    this.name.classList.add("command-name");

    this.area = document.createElement("div");
    this.area.classList.add("command-area");

    this.wrapper.appendChild(this.name);
    this.wrapper.appendChild(this.area);
    parent.appendChild(this.wrapper);
  }

  public setPos (pos: Point) {
    this.wrapper.style.top = `${pos.y}px`;
    this.wrapper.style.left = `${pos.x}px`;
    this.pos = pos;
  }
}