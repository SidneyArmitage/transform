import { Product } from "../../program/command/transform/variations/product.js";
import { Program } from "../../program/program.js";

export interface I_product_command {
  id: number;
  type: "product";
  data: {};
}

export const product = (program: Program): Product => {
  return new Product(program);
}