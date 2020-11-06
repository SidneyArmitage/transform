import { Command } from "./command.ts";
import { Connection } from "./connection";
import { Point } from "../../util";
import { Connection_control, Program_UI_Control } from "../control";
import { View_control } from "../control/view_control";

const exists = (connections: Set<Connection>, a: Connector, b: Connector): boolean => {
  for (let connection of connections.values()) {
    if(connection.is_match(a, b)) {
      return true;
    }
  }
  return false;
};

export class Connector {
  private parent: Command;
  private element: HTMLElement;
  private is_input: boolean;
  private connections: Set<Connection>;
  private control: Program_UI_Control;
  private click_fn: (event: MouseEvent) => void;

  constructor(control: Program_UI_Control, parent: Command, wrapper: HTMLElement, is_input: boolean) {
    this.control = control;
    this.connections = new Set();
    this.is_input = is_input;
    this.parent = parent;
    this.click_fn = (event: MouseEvent) => this.on_click(event);

    this.element = document.createElement("button");
    this.element.classList.add("command-connector");
    this.element.addEventListener("click", this.click_fn);
    wrapper.appendChild(this.element);
  }

  public on_click(event: MouseEvent): void {
    const connection_control = this.control.get_connection_control();
    const other = connection_control.get_connector();
    event.stopPropagation();
    if(!other) {
      connection_control.start_move(this);
      return;
    }
    if (this.is_input === other.get_is_input() || exists(this.connections, this, other)) {
      return;
    }
    new Connection(this, other, connection_control.get_svg(), this.control.get_view_control());
    connection_control.stop_move();
  }

  public get_is_input() {
    return this.is_input;
  }

  public attach (connection: Connection) {
    this.connections.add(connection);
  }

  public update () {
    this.connections.forEach((connection) => {
      connection.update();
    });
  }

  public get_pos (): Point {
    const rect = this.element.getBoundingClientRect();
    console.log(rect.left, rect.top);
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }
}