import { Divide } from "../../../program/command/transform/variations/divide";
import { Program } from "../../../program/program";

export const divide = (program: Program): number => {
  return new Divide(program).get_id();
}