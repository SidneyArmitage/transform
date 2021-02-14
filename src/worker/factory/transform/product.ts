import { Product } from "../../../program/command/transform/variations/product";
import { Program } from "../../../program/program";

export const product = (program: Program): number => {
  return new Product(program).get_id();
}