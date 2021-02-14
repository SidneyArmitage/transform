import { Command } from "../display/command";
import { svg_namespace } from "../../util";
import { Drag_control } from "./drag_control";
import { Connection_control } from "./connection_control";
import { View_control } from "./view_control";
import { Worker_control } from "./worker_control";

export class Program_UI_Control {
  private connection_control: Connection_control;
  private move_control: Drag_control;
  private view_control: View_control;
  private svg: SVGElement;
  private commands: Command[];
  private element: HTMLElement;
  private worker_control: Worker_control;
  
  constructor(element: HTMLElement) {
    this.element = element;
    this.worker_control = new Worker_control();
    this.svg = document.createElementNS(svg_namespace, "svg") as SVGElement;
    this.element.appendChild(this.svg);
    this.view_control = new View_control(this.element);
    this.connection_control = new Connection_control(this.element, this.svg, this.view_control);
    this.move_control = new Drag_control(this.element);
    this.commands = [];
  }

  public get_worker () {
    return this.worker_control;
  }

  public get_connection_control () {
    return this.connection_control;
  }

  public add_command(command: Command) {
    this.commands.push(command);
  }

  public get_move_control() {
    return this.move_control;
  }

  public get_view_control() {
    return this.view_control;
  }

}