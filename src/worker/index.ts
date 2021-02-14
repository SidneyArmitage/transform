import * as command from "./command";
import * as program from "./program";
import { message_data } from "./types/in";
import { Program } from "../program/program";
import { I_error, I_success } from "./types/out";

export class Worker_control {

  private index: number;
  private control: Program;
  constructor(control: Program) {
    this.index = 0;
    this.control = control;
    addEventListener("message", (e) => this.process_message(e));
  }

  private process_message (e: MessageEvent<message_data>) {
    switch(e.data.type) {
      case"program": 
        program.process(e.data.command, this.control, e.data.message_id, this);
      break;
      case"command":
        command.process(e.data.command, this.control, e.data.message_id, this);
      break;
      default:
      throw Error(`Unexpected input for: ${e.data}`);
    }
  }

  public send_message (type: "response", command: I_success | I_error){
    const id = this.index++;
    const message = {
      command: command,
      message_id: id,
      type: type,
    };
    console.log("sending", message);
    postMessage(message);
  }

}

const connection_control = new Worker_control(new Program());
