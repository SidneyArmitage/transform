import { Point, subtract } from "../../util";

export class View_control {
  private element: HTMLElement;
  private rule: CSSStyleRule;
  private pan_fn: (event: MouseEvent) => void;
  private stop_pan_fn: () => void;
  private start_position: Point;
  private position: Point;

  constructor(element: HTMLElement) {
    this.element = element;
    document.head.appendChild(document.createElement("style"));
    const style = document.styleSheets[1];
    const id = style.insertRule(`#${this.element.id} > .command, #${this.element.id} > svg > * {}`);
    const rule = style.cssRules.item(id);
    if(rule === null) {
      throw Error("Null Rule");
    }
    this.rule = rule as CSSStyleRule;
    this.pan_fn = (event: MouseEvent) => this.on_pan(event);
    this.stop_pan_fn = () => this.stop_pan();
    this.start_position = {
      x: 0,
      y: 0,
    };
    this.position = {
      x: 0,
      y: 0,
    };
    this.element.addEventListener("mousedown", (event) => this.start_pan(event));
  }

  public start_pan (event: MouseEvent) {
    this.start_position = subtract({
      x: event.clientX,
      y: event.clientY,
    }, this.position);
    this.element.addEventListener("mousemove", this.pan_fn);
    this.element.addEventListener("mouseup", this.stop_pan_fn);
  }

  public stop_pan () {
    this.element.removeEventListener("mousemove", this.pan_fn);
    this.element.removeEventListener("mouseup", this.stop_pan_fn);
  }

  public on_pan (event: MouseEvent) {
    this.position = {
      x: this.element.scrollLeft + event.clientX - this.start_position.x,
      y: this.element.scrollTop + event.clientY - this.start_position.y,
    };
    this.rule.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
  }

  public correct_position (view: Point): Point {
    return subtract(view, this.position);
  }
}