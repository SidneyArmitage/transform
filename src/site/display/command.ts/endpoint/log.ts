import { Command } from "..";
import { Point } from "../../../../util";
import { Program_UI_Control } from "../../../control/program_UI_Control";
import { Connector } from "../../connector";

export class Log_command extends Command {
  private div: HTMLDivElement;

  constructor(pos: Point, control: Program_UI_Control, parent: HTMLElement) {
    super(pos, control, parent, "Log");
    
    this.div = document.createElement("div");
    this.div.textContent = "";
    
    this.area.appendChild(this.div);
    this.input_add();
  }
}