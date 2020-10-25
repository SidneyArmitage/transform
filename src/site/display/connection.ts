import { subtract, svg_namespace } from "../../util";
import { View_control } from "../control/view_control";
import { Connector } from "./connector";

export class Connection {
  private a: Connector;
  private b: Connector;
  private line: SVGLineElement;
  private parent: SVGElement;
  private view_control: View_control;

  constructor(a: Connector, b: Connector, parent: SVGElement, view_control: View_control) {
    this.a = a;
    this.b = b;
    this.parent = parent;
    this.view_control = view_control;
    this.a.attach(this);
    this.b.attach(this);
    this.line = document.createElementNS(svg_namespace, "line") as SVGLineElement;
    this.update();
    parent.appendChild(this.line);
  }

  public update () {
    let rect = this.parent.getBoundingClientRect();
    let offset = {
      x: rect.left,
      y: rect.top,
    };
    let a_pos = this.view_control.correct_position(subtract(this.a.get_pos(), offset));
    let b_pos = this.view_control.correct_position(subtract(this.b.get_pos(), offset));
    this.line.setAttribute("x1", a_pos.x.toFixed(0));
    this.line.setAttribute("x2", b_pos.x.toFixed(0));
    this.line.setAttribute("y1", a_pos.y.toFixed(0));
    this.line.setAttribute("y2", b_pos.y.toFixed(0));
  }

  public is_match (a: Connector, b: Connector): boolean {
    return (this.a === a && this.b === b) || (this.a === b && this.b === a);
  }
}