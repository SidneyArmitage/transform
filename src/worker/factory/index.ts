import { Worker_control } from "..";
import { Program } from "../../program/program";
import { assign_id } from "../send";
import { Create } from "../types/in/program/create";
import { log } from "./endpoint/log";
import { manual } from "./input/manual";
import { divide } from "./transform/divide";
import { product } from "./transform/product";
import { subtract } from "./transform/subtract";
import { sum } from "./transform/sum";

export const create = (command: Create, program: Program, message_id: number, control: Worker_control) => {
  let id: number;
  switch(command.type) {
    case "manual_scalar":
      id = manual(command.describe, program);
      break;
    case "log":
      id = log(program);
      break;
    case "sum":
      id = sum(program);
      break;
    case "subtract":
      id = subtract(program);
      break;
    case "product":
      id = product(program);
      break;
    case "divide":
      id = divide(program);
      break;
  }
  assign_id(message_id, id, control);
}