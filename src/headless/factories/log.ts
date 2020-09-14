import { Log } from "../../program/command/endpoint/variations/log";
import { Program } from "../../program/program";

export interface I_log_command {
  id: number;
  type: "log";
  data: {};
}

export const log = (program: Program): Log => {
  return new Log(program);
}