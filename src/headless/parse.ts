import { Command } from "../program/command/command.js";
import { Program } from "../program/program.js";
import { divide, I_divide_command } from "./factories/divide.js";
import { I_log_command, log } from "./factories/log.js";
import { I_manual_command, manual } from "./factories/manual.js";
import { I_product_command, product } from "./factories/product.js";
import { I_subtract_command, subtract } from "./factories/subtract.js";
import { I_sum_command, sum } from "./factories/sum.js";

type I_command = I_manual_command | I_log_command | I_divide_command | I_product_command | I_sum_command | I_subtract_command;

interface Command_output {
  [i: number]: Command;
}

interface I_connection {
  id: number;
  next: I_connect[][];
}

interface I_connect {
  id: number;
  index: number;
}

export interface I_input {
  command: I_command[];
  connection: I_connection[];
  counter: number;
}

const command = (source: I_command[], program: Program): Command_output => {
  let output: Command_output = {};
  for (let item in source) {
    const current = source[item];
    try {
      switch (current.type) {
        case "scalar-manual": 
          output[current.id] = manual(current.data, program);
          break;
        case "log": 
          output[current.id] = log(program);
          break;
        case "product": 
          output[current.id] = product(program);
          break;
        case "divide": 
          output[current.id] = divide(program);
          break;
        case "subtract": 
          output[current.id] = subtract(program);
          break;
        case "sum": 
          output[current.id] = sum(program);
          break;
        default:
          console.error("unknown source for:", source[item].type);
      }
    } catch (err) {
      console.log("Error detected with");
      console.log("for: ", current.type);
      console.log(err);
    }
  }
  return output;
};

const connection = (source: I_connection[], commands: Command_output) => {
  for (let current of source) {
    const input = commands[current.id];
    for (let con in current.next) {
      for (let item in current.next[con]) {
        const cur = current.next[con][item];
        commands[cur.id].add_input(input, cur.index);
        input.add_output(commands[cur.id], Number.parseInt(item));
      }
    }
  }
};

export const parse = (data: I_input): Program => {
  const program = new Program();
  program.set_counter(data.counter);
  const commands = command(data.command, program);
  connection(data.connection, commands);

  return program;
}