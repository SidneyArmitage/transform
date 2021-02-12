import { Manual } from "../../program/command/input/variations/manual.js";
import { Program } from "../../program/program.js";

export interface I_manual_command {
  id: number;
  type: "scalar-manual";
  data: I_manual_data;
}

interface I_manual_data {
  value: any;
}

export const manual = (data: I_manual_data, program: Program): Manual => {
  return new Manual(program, [data.value]);
}