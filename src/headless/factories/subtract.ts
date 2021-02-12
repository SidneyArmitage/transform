import { Subtract } from "../../program/command/transform/variations/subtract.js";
import { Program } from "../../program/program.js";

export interface I_subtract_command {
  id: number;
  type: "subtract";
  data: {};
}

export const subtract = (program: Program): Subtract => {
  return new Subtract(program);
}