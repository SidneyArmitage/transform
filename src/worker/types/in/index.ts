import { command_instruction } from "./command";
import { program_instruction } from "./program";

export type message_data = I_message_program | I_message_command;

export interface I_message_program {
  type: "program";
  command: program_instruction;
  message_id: number;
}

export interface I_message_command {
  type: "command";
  command: command_instruction;
  message_id: number;
  id: number;
}