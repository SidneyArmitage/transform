import { Program } from "../../program";
import { Command } from "../command";

export abstract class Transform<T> extends Command<T> {
  private outputs: Command<any>[];
  private inputs: Command<any>[];

  constructor(program: Program, value: T) {
    super(program, value);
    this.outputs = [];
    this.inputs = [];
  }

  public get_inputs(): Command<any>[] {
    return this.inputs;
  }

  public get_outputs(): Command<any>[] {
    return this.outputs;
  }
}