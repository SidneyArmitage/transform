import { Command } from "./command/command.js";

export const is_circular = (input: Command, output: Command): boolean => {
  if(output === input) {
    return true;
  }
  const outputs = output.get_all_outputs();
  if(outputs.length === 0) {
    return false;
  }
  return outputs.every((item) => is_circular(input, item) === false);
};

export const valid_types = (input: Command, output: Command): boolean => {
  return false;
};
