import { Command } from "..";
import { Point } from "../../../../util";

export class Log_command extends Command {
  private div: HTMLDivElement;

  constructor(pos: Point, id: number, parent: HTMLElement) {
    super(pos, id, parent, "Log");
    
    this.div = document.createElement("div");
    this.div.textContent = "";
    
    this.area.appendChild(this.div);
  }
}