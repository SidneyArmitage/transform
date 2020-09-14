import { Program } from "../../program";
import { Command } from "../command";

export abstract class Endpoint extends Command<null> {
  private inputs: Command<any>[];
  
  constructor(program: Program) {
    super(program, null);
    this.inputs = [];
  }

  public get_inputs(): Command<any>[] {
    return this.inputs;
  }

  public get_outputs(): Command<any>[] {
    return [];
  }
  
  public add_input(command: Command<any>): void {
    this.inputs.push(command);
  }

  public add_output(command: Command<any>): void {
    throw Error("Unable to attach output to endpoint");
  }
}