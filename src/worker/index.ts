import * as command from "./command";
import * as program from "./program";
import { message_data } from "./types/in";
import { Program } from "../program/program";

const control = new Program();

const onMessage = (e: MessageEvent<message_data>) => {
  switch(e.data.type) {
    case"program": 
      program.process(e.data.command, control, e.data.message_id);
    break;
    case"command":
      command.process(e.data.command, control, e.data.message_id);
    break;
    default:
    throw Error(`Unexpected input for: ${e.data}`);
  }
}

addEventListener("message", onMessage);