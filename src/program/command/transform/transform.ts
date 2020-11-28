import { Program } from "../../program";
import { Command } from "../command";

export abstract class Transform<T> extends Command<T> {
  private outputs: Command<any>[][];
  private inputs: Command<any>[];

  constructor(program: Program, value: T) {
    super(program, value);
    this.outputs = [];
    this.inputs = [];
  }

  public get_input(index: number): Command<any> | undefined {
    return this.inputs[index];
  }

  public get_all_inputs(): Command<any>[] {
    return this.inputs.flat();
  }

  public get_outputs(index: number): Command<any>[] {
    return this.outputs[index] || [];
  }

  public get_all_outputs(): Command<any>[] {
    return this.outputs.flat();
  }
  
  public add_input(command: Command<any>, index: number): void {
    this.inputs[index] = command;
  }

  public add_output(command: Command<any>, index: number): void {
    this.outputs[index].push(command);
  }
}