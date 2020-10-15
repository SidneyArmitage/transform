import { Program } from "../program/program";
import { create } from "./factory";
import { program_instruction } from "./types/in/program";

export const process = (command: program_instruction, program: Program, message_id: number) => {
  switch(command.type) {
    case "create":
      create(command.command, program, message_id);
      break;
      default:
      throw Error(`Unexpected input for: ${command}`);
  }
}