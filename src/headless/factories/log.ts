import { Log } from "../../program/command/endpoint/variations/log.js";
import { Program } from "../../program/program.js";

export interface I_log_command {
  id: number;
  type: "log";
  data: {};
}

export const log = (program: Program): Log => {
  return new Log(program);
}