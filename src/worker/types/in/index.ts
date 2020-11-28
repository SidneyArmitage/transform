import { Command_instruction } from "./command";
import { Program_instruction } from "./program";

export type message_data = I_message_program | I_message_command;

export interface I_message_program {
  type: "program";
  command: Program_instruction;
  message_id: number;
}

export interface I_message_command {
  type: "command";
  command: I_command;
  message_id: number;
}

export interface I_command {
  id: number;
  command: Command_instruction;
}