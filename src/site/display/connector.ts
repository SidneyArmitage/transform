import { Command } from "./command";
import { Connection } from "./connection";
import { Point } from "../../util";
import { Connection_control, Program_UI_Control } from "../control";
import { View_control } from "../control/view_control";
import { I_command } from "../../worker/types/in";

const exists = (connections: Set<Connection>, a: Connector, b: Connector): boolean => {
  for (let connection of connections.values()) {
    if(connection.is_match(a, b)) {
      return true;
    }
  }
  return false;
};
// if limited is true and length != 0
const limited = (limited: boolean, length: number): boolean => {
  return limited === true && length > 0;
};

// will need to add self to visited
const is_loop = (conn: Connector, visited: Set<Command>): boolean => {
  const parent = conn.get_parent();
  if (visited.has(parent)) {
    return true;
  }
  // returns false on empty
  return parent.get_outputs().reduce((acc, cur) => ([
    ...acc,
    ...(cur.get_connected())
  ]), [] as Connector[]).some((con) =>  is_loop(con, visited));
}

const create_connection_message = (in_id: number, out_id: number, in_index: number, out_index: number): I_command => ({
  id: in_id,
  command: {
    type: "attach",
    id: out_id,
    input: in_index,
    output: out_index,
  },
});

export class Connector {
  private parent: Command;
  private element: HTMLElement;
  private is_input: boolean;
  private is_limited: boolean;
  private id: number;
  private connections: Set<Connection>;
  private control: Program_UI_Control;
  private click_fn: (event: MouseEvent) => void;

  constructor(control: Program_UI_Control, parent: Command, wrapper: HTMLElement, is_input: boolean, id: number, is_limited: boolean) {
    this.control = control;
    this.connections = new Set();
    this.is_input = is_input;
    this.parent = parent;
    this.is_limited = is_limited;
    this.id = id;
    this.click_fn = (event: MouseEvent) => this.on_click(event);

    this.element = document.createElement("button");
    this.element.classList.add("command-connector");
    this.element.addEventListener("click", this.click_fn);
    wrapper.appendChild(this.element);
  }

  public async on_click(event: MouseEvent): Promise<void> {
    const connection_control = this.control.get_connection_control();
    const other = connection_control.get_connector();
    event.stopPropagation();
    if(!other) {
      connection_control.start_move(this);
      return;
    }
    console.log("connecting...");
    if (this.is_input === other.get_is_input() || exists(this.connections, this, other) || limited(this.is_limited, length) || (this.get_is_input() ? is_loop(this, new Set([other.get_parent()])) : is_loop(other, new Set([this.parent])))) {
      console.log("same", this.is_input === other.get_is_input())
      console.log("exists", exists(this.connections, this, other));
      console.log("limited", limited(this.is_limited, length));
      console.log("is loop", this.get_is_input() ? is_loop(other, new Set([this.parent])) : is_loop(this, new Set([other.get_parent()])));
      console.log("alt is loop", !this.get_is_input() ? is_loop(other, new Set([this.parent])) : is_loop(this, new Set([other.get_parent()])));
      return;
    }
    let attach_msg: I_command | undefined;
    if (this.is_input) {
      attach_msg = create_connection_message(this.parent.get_id(), other.parent.get_id(), this.id, other.id);
    } else {
      attach_msg = create_connection_message(other.parent.get_id(), this.parent.get_id(), other.id, this.id);
    }
    // const msg = await this.control.get_worker().send_message("command", attach_msg);
    new Connection(this, other, connection_control.get_svg(), this.control);
    console.log("connected...");
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

  public get_parent(): Command {
    return this.parent;
  }

  public get_pos (): Point {
    const rect = this.element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  public get_connected (): Connector[] {
    return Array.from(this.connections).map((connection) => (connection.get_other(this)));
  }
}