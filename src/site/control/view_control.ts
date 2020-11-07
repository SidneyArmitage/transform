import { Program_UI_Control } from ".";
import { add, Point, subtract } from "../../util";


export class View_control {
  private element: HTMLElement;
  private rule: CSSStyleRule;
  private pan_fn: (event: MouseEvent) => void;
  private stop_pan_fn: () => void;
  private start_position: Point;
  private position: Point;
  private scale: number;
  private size: Point;
  private offset: Point;

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
    const pos = this.element.getBoundingClientRect();
    this.rule.style.transform = `translate(${this.position.x - pos.left}px, ${this.position.y - pos.top}px)`;
    this.scale = 1;
    this.size = {
      x: 1,
      y: 1,
    };
    this.offset = {
      x: 0,
      y: 0,
    };
    this.element.addEventListener("mousedown", (event) => this.start_pan(event));
    this.element.addEventListener("wheel", (event: WheelEvent) => this.on_wheel(event));
    this.update();
  }

  public start_pan (event: MouseEvent) {
    this.start_position = subtract({
      x: event.clientX / this.scale,
      y: event.clientY / this.scale,
    }, this.position);
    this.element.addEventListener("mousemove", this.pan_fn);
    this.element.addEventListener("mouseup", this.stop_pan_fn);
  }

  public stop_pan () {
    this.element.removeEventListener("mousemove", this.pan_fn);
    this.element.removeEventListener("mouseup", this.stop_pan_fn);
  }

  public on_pan (event: MouseEvent) {
    const pos = this.element.getBoundingClientRect();
    console.log(pos.top);
    this.position = {
      x: event.clientX / this.scale - this.start_position.x,
      y: event.clientY / this.scale - this.start_position.y,
    };
    this.rule.style.transform = `translate(${this.position.x - pos.left}px, ${this.position.y - pos.top}px)`;
    this.update();
  }

  public correct_position (view: Point): Point {
    const dist = this.element.getBoundingClientRect().top;
    const out = {
      x: view.x / this.scale - this.position.x,
      y: (view.y - dist) / this.scale - this.position.y + dist,
    };
    console.log("view", view, "position", this.position, "scale:", this.scale, "out", out);
    return out;
  }

  private update () {
    this.element.style.backgroundPosition = `${54 + this.position.x}px ${55+ this.position.y}px, ${this.position.x}px ${this.position.y}px, ${this.position.x}px ${this.position.y}px, ${this.position.x}px ${this.position.y}px, ${this.position.x}px ${this.position.y}px`;
    this.element.style.width = `${this.size.x * 100}%`;
    this.element.style.height = `${this.size.y * 100}%`;
    this.element.style.transform = `translate(${this.offset.x * 100}%, ${this.offset.y * 100}%) scale(${this.scale})`; 
  }

  public on_wheel (event: WheelEvent) {
    this.scale = Math.max(this.scale + this.scale * event.deltaY * -0.01, 0.001);
    this.size = {
      x: 1 / this.scale,
      y: 1 / this.scale,
    };
    this.offset = {
      x: this.scale * 0.5 - 0.5,
      y: this.scale * 0.5 - 0.5,
    }
    this.update();
  }
}