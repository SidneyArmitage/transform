import { Command } from "./command/command";
import { Input } from "./command/input/input";

export class Program {
  private inputs: Command<any>[];
  private counter: number;

  constructor() {
    this.inputs = [];
    this.counter = 0;
  }

  /**
   * the new value can only be larger than the existing value.
   * @param value number
   */
  public setCounter (value: number): boolean {
    if (value <= this.counter) {
      return false;
    }
    this.counter = value;
    return true;
  }

  public addInput (input: Input<any>) {
    this.inputs.push(input);
  }

  public async run(): Promise<void> {
    let execution_id = Date.now();
    this.inputs.map(e => e.propagate_aborted(false));
    await Promise.resolve(this.inputs.map(async input => input.run(execution_id)));
  }

  stop(reason: string) {
    console.log("stopping due to:", reason);
    this.inputs.map(e => e.propagate_aborted(true));
  }
}