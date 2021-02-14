import { I_divide } from "./divide.js";
import { I_log } from "./log.js";
import { I_manual } from "./manual.js";
import { I_product } from "./product.js";
import { I_subtract } from "./subtract.js";
import { I_sum } from "./sum.js";

export type Create = 
  I_manual | 
  I_log | 
  I_sum | 
  I_subtract | 
  I_product | 
  I_divide;

export interface I_create {
  type: "create";
  command: Create;
}