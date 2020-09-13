import { Program } from "../../program";
import { Command } from "../command";

export abstract class Input<T> extends Command<T> {
  private outputs: Command<any>[];

  constructor(program: Program, value: T) {
    super(program, value);
    this.outputs = [];
  }

  public get_inputs(): Command<any>[] {
    return [];
  }

  public get_outputs(): Command<any>[] {
    return this.outputs;
  }
}