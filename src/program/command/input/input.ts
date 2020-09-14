import { Program } from "../../program";
import { Command } from "../command";

export abstract class Input<T> extends Command<T> {
  private outputs: Command<any>[];

  constructor(program: Program, value: T) {
    super(program, value);
    this.outputs = [];
    program.addInput(this);
  }

  public get_inputs(): Command<any>[] {
    return [];
  }

  public get_outputs(): Command<any>[] {
    return this.outputs;
  }
  
  public add_input(command: Command<any>): void {
    throw Error("Unable to add input");
  }

  public add_output(command: Command<any>): void {
    this.outputs.push(command);
  }
}