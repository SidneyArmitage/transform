import { Sum } from "../../program/command/transform/variations/sum.js";
import { Program } from "../../program/program.js";

export interface I_sum_command {
  id: number;
  type: "sum";
  data: {};
}

export const sum = (program: Program): Sum => {
  return new Sum(program);
}