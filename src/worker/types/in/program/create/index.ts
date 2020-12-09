import { I_log } from "./log.js";
import { I_manual } from "./manual.js";

export type Create = I_manual | I_log;

export interface I_create {
  type: "create";
  command: Create;
}