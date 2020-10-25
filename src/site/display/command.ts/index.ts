import { invert_y, Point, subtract } from "../../../util";
import { I_movable } from "../../control";
import { Program_UI_Control } from "../../control/program_UI_Control";
import { Connector } from "../connector";

export abstract class Command implements I_movable {
  private id: number;
  private wrapper: HTMLElement;
  private name: HTMLElement;
  private pos: Point;
  private input_wrapper: HTMLElement;
  private output_wrapper: HTMLElement;
  private inputs: Set<Connector>;
  private outputs: Set<Connector>;
  private control: Program_UI_Control;
  private movement_offset: Point;
  private move_start_fn: (event: MouseEvent) => void;

  protected area: HTMLElement;

  constructor(pos: Point, control: Program_UI_Control, parent: HTMLElement, name: string) {
    this.movement_offset = {
      x: 0,
      y: 0,
    };
    this.control = control;
    this.id = 0;
    this.inputs = new Set();
    this.outputs = new Set();
    this.move_start_fn = (event: MouseEvent) => this.on_move_start(event);
    
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("command");
    this.pos = control.get_view_control().correct_position({
      x: pos.x,
      y: window.innerHeight - pos.y,
    });
    this.set_pos(this.pos);

    this.name = document.createElement("div");
    this.name.textContent = name;
    this.name.classList.add("command-name");
    this.name.addEventListener("mousedown", this.move_start_fn);

    this.input_wrapper = document.createElement("div");
    this.input_wrapper.classList.add("command-input");

    this.output_wrapper = document.createElement("div");
    this.output_wrapper.classList.add("command-output");

    this.area = document.createElement("div");
    this.area.classList.add("command-area");

    this.wrapper.appendChild(this.input_wrapper);
    this.wrapper.appendChild(this.output_wrapper);
    this.wrapper.appendChild(this.name);
    this.wrapper.appendChild(this.area);
    parent.appendChild(this.wrapper);
  }

  public on_move_start(event: MouseEvent): void {
    event.stopPropagation();
    this.control.get_move_control().start_move(this, this.name);
    this.movement_offset = invert_y(subtract({
      x: event.pageX,
      y: event.pageY,
    }, this.pos));
  }

  public on_move(position: Point): void {
    const temp = subtract(position, this.movement_offset);
    this.set_pos({
      x: temp.x,
      y: window.innerHeight - temp.y,
    });
    this.inputs.forEach((e) => e.update());
    this.outputs.forEach((e) => e.update());
  }

  public set_pos (pos: Point) {
    this.wrapper.style.top = `${pos.y}px`;
    this.wrapper.style.left = `${pos.x}px`;
    this.pos = {
      x: pos.x,
      y: pos.y,
    };
    console.log(pos);
  }

  public get_pos () {
    return this.pos;
  }

  protected get_id () {
    return this.id;
  }

  protected input_add() {
    this.inputs.add(new Connector(this.control, this, this.input_wrapper, true));
  }

  protected output_add() {
    this.outputs.add(new Connector(this.control, this, this.output_wrapper, false));
  }
}