import { Manual } from "../../program/command/input/variations/manual";
import { Program } from "../../program/program";

export interface I_manual_command {
  id: number;
  type: "scalar-manual";
  data: I_manual_data;
}

interface I_manual_data {
  value: any;
}

export const manual = (data: I_manual_data, program: Program): Manual<any> => {
  return new Manual(program, data.value);
}