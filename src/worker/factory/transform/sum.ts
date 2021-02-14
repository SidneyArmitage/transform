import { Sum } from "../../../program/command/transform/variations/sum"
import { Program } from "../../../program/program";

export const sum = (program: Program): number => {
  return new Sum(program).get_id();
}