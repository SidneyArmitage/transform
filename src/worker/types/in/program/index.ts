import { I_create } from "./create";

export type Program_instruction = I_create | I_program_run;

export interface I_program_run {
  type: "run";
};