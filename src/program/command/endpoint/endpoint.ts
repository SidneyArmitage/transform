import { Program } from "../../program";
import { Command } from "../command";

export abstract class Endpoint extends Command {
  private inputs: Command[];
  
  constructor(program: Program, id?: number) {
    super(program, [null], id);
    this.inputs = [];
  }

  public get_output_index(command: Command) {
    return undefined;
  }

  public get_type_output(index: number): number {
    return 0;
  }

  public get_input(index: number): Command | undefined  {
    return this.inputs[index];
  }

  public get_all_inputs(): Command[] {
    return this.inputs;
  }

  public get_outputs(index: number): Command[] {
    return [];
  }

  public get_all_outputs(): Command[] {
    return [];
  }
  
  public add_input(command: Command, index: number): void {
    this.inputs[index] = command;
  }

  public add_output(command: Command, index: number): void {
    throw Error("Unable to attach output to endpoint");
  }
}