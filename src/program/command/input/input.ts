import { Program } from "../../program";
import { Command } from "../command";

export abstract class Input extends Command {
  private outputs: Command[][];

  constructor(program: Program, value: any[], id?: number) {
    super(program, value, id);
    this.outputs = new Array(value.length);
    program.add_input(this);
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
    return undefined;
  }

  public get_type_input(index: number): number {
    return 0;
  }

  public get_all_inputs(): Command[] {
    return [];
  }

  public get_outputs(index: number): Command[] {
    return this.outputs[index];
  }
  
  public get_all_outputs(): Command[] {
    return this.outputs.flat();
  }
  
  public add_input(command: Command): void {
    throw Error("Unable to add input");
  }

  public add_output(command: Command, index: number): void {
    let output = this.outputs[index % this.outputs.length]
    if (output === undefined) {
      output = this.outputs[index % this.outputs.length] = [];
    }
    output.push(command);
  }
}