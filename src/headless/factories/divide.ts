import { Divide } from "../../program/command/transform/variations/divide.js";
import { Program } from "../../program/program.js";

export interface I_divide_command {
  id: number;
  type: "divide";
  data: {};
}

export const divide = (program: Program): Divide => {
  return new Divide(program);
}