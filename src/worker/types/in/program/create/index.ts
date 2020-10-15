import { I_log } from "./log";
import { I_manual } from "./manual";

export type Create = I_manual | I_log;

export interface I_create {
  type: "create";
  command: Create;
}