import { Subtract } from "../../../program/command/transform/variations/subtract";
import { Program } from "../../../program/program";

export const subtract = (program: Program): number => {
  return new Subtract(program).get_id();
}