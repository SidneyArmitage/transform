import { Program } from "../../program";
import { Command } from "../command";

export abstract class Transform extends Command {
  private outputs: Command[][];
  private inputs: Command[];

  constructor(program: Program, value: any[], id?: number) {
    super(program, value, id);
    this.outputs = new Array(value.length);
    this.inputs = [];
  }

  public get_output_index(command: Command): number | undefined {
    for (let i in this.outputs) {
      if (this.outputs[i].includes(command)) {
        return Number.parseInt(i);
      }
    }
    return undefined;
  }

  public get_input(index: number): Command | undefined {
    return this.inputs[index];
  }

  public get_all_inputs(): Command[] {
    return this.inputs.flat();
  }

  public get_outputs(index: number): Command[] {
    return this.outputs[index] || [];
  }

  public get_all_outputs(): Command[] {
    return this.outputs.flat();
  }
  
  public add_input(command: Command, index: number): void {
    this.inputs[index] = command;
  }

  public add_output(command: Command, index: number): void {
    let output = this.outputs[index % this.outputs.length]
    if (output === undefined) {
      output = this.outputs[index % this.outputs.length] = [];
    }
    output.push(command);
  }
}