import { Manual } from "../../../program/command/input/variations/manual";
import { Program } from "../../../program/program";
import { Manual as Manual_type } from "../../types/in/program/create/manual";

export const manual = (command: Manual_type, program: Program): number => {
  let manual;
  switch (command.type) {
    case "boolean":
      manual = new Manual(program, [command.value]);
      break;
    case "number":
      manual = new Manual(program, [command.value]);
      break;
    case "string":
      manual = new Manual(program, [command.value]);
      break;
    default: 
      throw Error("Unexpected type received for manual");
  }
  return manual.get_id();
}