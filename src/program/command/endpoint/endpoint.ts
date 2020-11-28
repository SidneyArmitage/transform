import { Program } from "../../program";
import { Command } from "../command";

export abstract class Endpoint extends Command<null> {
  private inputs: Command<any>[];
  
  constructor(program: Program, id?: number) {
    super(program, null, id);
    this.inputs = [];
  }

  public get_input(index: number): Command<any> | undefined  {
    return this.inputs[index];
  }

  public get_all_inputs(): Command<any>[] {
    return this.inputs;
  }

  public get_outputs(index: number): Command<any>[] {
    return [];
  }

  public get_all_outputs(): Command<any>[] {
    return [];
  }
  
  public add_input(command: Command<any>, index: number): void {
    this.inputs[index] = command;
  }

  public add_output(command: Command<any>, index: number): void {
    throw Error("Unable to attach output to endpoint");
  }
}