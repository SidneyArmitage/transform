import { Log } from "../../../program/command/endpoint/variations/log"
import { Program } from "../../../program/program";

export const log = (program: Program): number => {
  let log = new Log(program);
  return log.get_id();
}