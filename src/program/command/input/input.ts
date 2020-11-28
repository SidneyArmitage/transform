import { Program } from "../../program";
import { Command } from "../command";

export abstract class Input<T> extends Command<T> {
  private outputs: Command<any>[][];

  constructor(program: Program, value: T, id?: number) {
    super(program, value, id);
    this.outputs = [];
    program.add_input(this);
  }

  public get_input(index: number): Command<any> | undefined {
    return undefined;
  }

  public get_all_inputs(): Command<any>[] {
    return [];
  }

  public get_outputs(index: number): Command<any>[] {
    return this.outputs[index];
  }
  
  public get_all_outputs(): Command<any>[] {
    return this.outputs.flat();
  }
  
  public add_input(command: Command<any>): void {
    throw Error("Unable to add input");
  }

  public add_output(command: Command<any>, index: number): void {
    this.outputs[index].push(command);
  }
}