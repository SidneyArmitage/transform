import { Program } from "../../program/program";
import { assign_id } from "../send";
import { Create } from "../types/in/program/create";
import { log } from "./endpoint/log";
import { manual } from "./input/manual";

export const create = (command: Create, program: Program, message_id: number) => {
  let id: number;
  switch(command.type) {
    case "manual_scalar":
      id = manual(command.describe, program);
      break;
    case "log":
      id = log(program);
      break;
  }
  assign_id(message_id, id);
}