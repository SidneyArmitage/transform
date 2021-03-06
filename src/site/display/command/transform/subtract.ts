import { Command } from "..";
import { Point } from "../../../../util";
import { Program_UI_Control } from "../../../control";

export class Subtract_command extends Command {
  private div: HTMLDivElement;

  constructor(pos: Point, control: Program_UI_Control, parent: HTMLElement, id: number) {
    super(pos, control, parent, id, "Subtract");
    
    this.div = document.createElement("div");
    this.div.textContent = "";
    
    this.area.appendChild(this.div);
    this.input_add(0, true);
    this.input_add(1, false);
    this.output_add(0);
  }
}