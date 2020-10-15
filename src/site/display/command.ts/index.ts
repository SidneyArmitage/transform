import { Point } from "../../../util";
import { Program_UI_Control } from "../../control/programUIControl";

export abstract class Command {
  private id: number;
  private wrapper: HTMLElement;
  private name: HTMLElement;
  private pos: Point;

  protected area: HTMLElement;

  constructor(pos: Point, control: Program_UI_Control, parent: HTMLElement, name: string) {
    this.id = 0;
    
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("command");
    this.pos = pos;
    this.set_pos(pos);

    this.name = document.createElement("div");
    this.name.textContent = name;
    this.name.classList.add("command-name");

    this.area = document.createElement("div");
    this.area.classList.add("command-area");

    this.wrapper.appendChild(this.name);
    this.wrapper.appendChild(this.area);
    parent.appendChild(this.wrapper);
  }

  public set_pos (pos: Point) {
    this.wrapper.style.top = `${pos.y}px`;
    this.wrapper.style.left = `${pos.x}px`;
    this.pos = pos;
  }

  protected get_id () {
    return this.id;
  }
}