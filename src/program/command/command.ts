import { Program } from "../program";

export abstract class Command<T> {
  private last_execution_id: number;
  private program: Program;
  private aborted: boolean;
  
  protected value: T;

  constructor(program: Program, value: T) {
    this.last_execution_id = 0;
    this.program = program;
    this.aborted = false;
    this.value = value;
  }

  public abstract get_inputs(): Command<any>[];
  public abstract add_input(command: Command<any>): void;
  public abstract get_outputs(): Command<any>[];
  public abstract add_output(command: Command<any>): void;
  
  public get_value(): T {
    return this.value;
  }

  public get_execution_id() {
    return this.last_execution_id;
  }

  public async run (execution_id: number): Promise<void> {
    if(!this.get_inputs().every(e => e.get_execution_id() === execution_id) || this.aborted) {
      return;
    }
    try {
      await this.run_local();
    } catch (err) {
      this.program.stop(err);
      throw err;
    }
    this.last_execution_id = execution_id;
    await Promise.resolve(this.get_outputs().map(async output => output.run(execution_id)));
    
  }

  public propagate_aborted(aborted: boolean) {
    this.aborted = aborted;
    this.get_outputs().map(e => e.propagate_aborted(aborted));
  }

  protected async abstract run_local(): Promise<void>;
}