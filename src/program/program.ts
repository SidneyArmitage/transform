import { Command } from "./command/command";

export class Program {
  private inputs: Command<any>[];

  constructor() {
    this.inputs = [];
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