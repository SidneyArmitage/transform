import { Worker_control } from ".";
import { is_circular } from "../program/detect";
import { Program } from "../program/program";
import { I_command } from "./types/in/";
import { I_attach } from "./types/in/command";

const attach = (instruction: I_attach, id: number, program: Program, message_id: number, control: Worker_control) => {
  const in_command = program.get_command(id);
  const out_command = program.get_command(instruction.id);
  // TODO: add validation
  // existing input
  if (is_circular(out_command, in_command)) {
    console.log("circular dependency detected.")
  }
  // valid types
  // disconnect existing
  in_command.add_input(out_command, instruction.input);
  out_command.add_output(out_command, instruction.output);
}

export const process = (command: I_command, program: Program, message_id: number, control: Worker_control) => {
  switch(command.command.type) {
    case "attach":
      attach(command.command, command.id, program, message_id, control);
      break;
    case "add_listener":
      break;
    default:
      break;
  }
}