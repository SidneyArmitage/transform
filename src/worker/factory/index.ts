import { Worker_control } from "..";
import { Program } from "../../program/program";
import { assign_id } from "../send";
import { Create } from "../types/in/program/create";
import { log } from "./endpoint/log.js";
import { manual } from "./input/manual.js";

export const create = (command: Create, program: Program, message_id: number, control: Worker_control) => {
  let id: number;
  switch(command.type) {
    case "manual_scalar":
      id = manual(command.describe, program);
      break;
    case "log":
      id = log(program);
      break;
  }
  assign_id(message_id, id, control);
}