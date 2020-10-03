import { Command } from "../program/command/command";
import { Program } from "../program/program";
import { I_log_command, log } from "./factories/log";
import { I_manual_command, manual } from "./factories/manual";

type I_command = I_manual_command | I_log_command;

interface Command_output {
  [i: number]: Command<any>;
}

interface I_connection {
  id: number;
  next: number[];
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
    for (let item of current.next) {
      commands[item].add_input(input);
      input.add_output(commands[item]);
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