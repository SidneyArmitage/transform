import { Program } from "../program/program";
import { create } from "./factory";
import { Program_instruction } from "./types/in/program";
import { Worker_control } from "./";

export const process = (command: Program_instruction, program: Program, message_id: number, control: Worker_control) => {
  switch(command.type) {
    case "create":
      create(command.command, program, message_id, control);
      break;
    default:
      throw Error(`Unexpected input for: ${command}`);
  }
}