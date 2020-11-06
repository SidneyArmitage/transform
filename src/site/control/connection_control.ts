import { Connector } from "../display/connector";
import { svg_namespace } from "../../util";
import { View_control } from "./view_control";

export class Connection_control {
  private selected: Connector | null;
  private move_fn: (event: MouseEvent) => void;
  private click_fn: () => void;
  private svg: SVGElement;
  private line: SVGLineElement;
  private element: HTMLElement;
  private view_control: View_control;

  constructor(element: HTMLElement, svg: SVGElement, view_control: View_control) {
    this.element = element;
    this.view_control = view_control;
    this.svg = svg;
    this.selected = null;
    this.move_fn = (event) => this.on_move(event);
    this.click_fn = () => this.stop_move();

    this.line = document.createElementNS(svg_namespace, "line") as SVGLineElement;
    this.svg.appendChild(this.line);
  } 
  
  public start_move (connector: Connector) {
    this.selected = connector;
    let a_pos = this.view_control.correct_position(connector.get_pos());
    this.line.setAttribute("x1", a_pos.x.toFixed(0));
    this.line.setAttribute("x2", a_pos.x.toFixed(0));
    this.line.setAttribute("y1", a_pos.y.toFixed(0));
    this.line.setAttribute("y2", a_pos.y.toFixed(0));
    this.element.addEventListener("mousemove", this.move_fn);
    this.element.addEventListener("click", this.click_fn);
  }
  
  public stop_move () {
    this.element.removeEventListener("mousemove", this.move_fn);
    this.element.removeEventListener("click", this.click_fn);
    this.selected = null;
    this.line.setAttribute("x1", "0");
    this.line.setAttribute("x2", "0");
    this.line.setAttribute("y1", "0");
    this.line.setAttribute("y2", "0");
  }

  public on_move (event: MouseEvent): void {
    if (this.selected == null) {
      throw Error("no selected connector");
    }
    let pos = this.view_control.correct_position({
      x: event.pageX,
      y: event.pageY,
    });
    this.line.setAttribute("x2", pos.x.toFixed(0));
    this.line.setAttribute("y2", pos.y.toFixed(0));
  }

  public get_connector (): Connector | null {
    return this.selected;
  }

  public get_svg() {
    return this.svg;
  }
}