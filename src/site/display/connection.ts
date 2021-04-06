import { svg_namespace} from "../../util";
import { Program_UI_Control } from "../control";
import { View_control } from "../control/view_control";
import { Connector } from "./connector.js";
import { Selectable } from "./selectable";

export class Connection implements Selectable{
  private a: Connector;
  private b: Connector;
  private line: SVGLineElement;
  private view_control: View_control;
  private ui_control: Program_UI_Control;
  private selected: boolean;
  // slope
  // start
  // length

  constructor(a: Connector, b: Connector, parent: SVGElement, ui_control: Program_UI_Control) {
    this.a = a;
    this.b = b;
    this.view_control = ui_control.get_view_control();
    this.ui_control = ui_control;
    this.selected = false;
    this.a.attach(this);
    this.b.attach(this);
    this.line = document.createElementNS(svg_namespace, "line") as SVGLineElement;
    this.line.addEventListener("click", (event) => this.on_click(event));
    this.update();
    parent.appendChild(this.line);
  }

  public select () {
    this.selected = true;
    this.line.classList.add("selected");
  }

  public deselect () {
    this.selected = false;
    this.line.classList.remove("selected");
  }


  public on_click(event: MouseEvent) {
    if (this.selected === false) {
      this.ui_control.select([this]);
    } else {
      this.deselect();
      this.ui_control.remove_selected(this);
    }
  }

  public update () {
    let a_pos = this.view_control.correct_position(this.a.get_pos());
    let b_pos = this.view_control.correct_position(this.b.get_pos());
    this.line.setAttribute("x1", a_pos.x.toFixed(0));
    this.line.setAttribute("x2", b_pos.x.toFixed(0));
    this.line.setAttribute("y1", a_pos.y.toFixed(0));
    this.line.setAttribute("y2", b_pos.y.toFixed(0));
  }

  public is_match (a: Connector, b: Connector): boolean {
    return (this.a === a && this.b === b) || (this.a === b && this.b === a);
  }

  public get_other (a: Connector): Connector {
    return a === this.a ? this.b : this.a;
  }
}