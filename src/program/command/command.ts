import { Program } from "../program";

export abstract class Command {
  private last_execution_id: number;
  private id: number;
  private program: Program;
  private aborted: boolean;
  private on_start_listener: (() => void)[];
  private on_finish_listener: (((err: any, value: any[] | null) => void))[];
  
  protected value: any[];

  constructor(program: Program, value: any[], id?: number) {
    this.last_execution_id = 0;
    this.id = id || program.pop_id();
    program.add_command(this);
    this.program = program;
    this.aborted = false;
    this.value = value;
    this.on_start_listener = [];
    this.on_finish_listener = [];
  }

  public abstract get_input(index: number): Command | undefined;
  public abstract get_all_inputs(): Command[];
  public abstract add_input(command: Command, index: number): void;
  public abstract get_outputs(index: number): Command[];
  public abstract get_output_index(command: Command): number | undefined;
  public abstract get_all_outputs(): Command[];
  public abstract add_output(command: Command, index: number): void;
  public abstract get_type_input(index: number): number;
  public abstract get_type_output(index: number): number;
  
  public get_value(index: number): any {
    return this.value[index % this.value.length];
  }

  public get_execution_id() {
    return this.last_execution_id;
  }

  public get_id() {
    return this.id;
  }

  public async run (execution_id: number): Promise<void> {
    if(!this.get_all_inputs().every(e => e.get_execution_id() === execution_id) || this.aborted) {
      return;
    }
    try {
      this.on_start_listener.forEach((fn) => fn());
      await this.run_local();
      this.on_finish_listener.forEach((fn) => fn(null, this.value));
    } catch (err: any) {
      this.on_finish_listener.forEach((fn) => fn(err, null));
      this.program.stop(err);
      throw err;
    }
    this.last_execution_id = execution_id;
    await Promise.resolve(this.get_all_outputs().map(async output => output.run(execution_id)));
    
  }

  public propagate_aborted(aborted: boolean) {
    this.aborted = aborted;
    this.get_all_outputs().map(e => e.propagate_aborted(aborted));
  }

  public add_on_start_listener (fn: () => void) {
    this.on_start_listener.push(fn);
  }

  public remove_on_start_listener (fn: () => void) {
    this.on_start_listener.splice(this.on_start_listener.indexOf(fn), 1);
  }

  public add_on_finish_listener (fn: () => void) {
    this.on_finish_listener.push(fn);
  }

  public remove_on_finish_listener (fn: () => void) {
    this.on_finish_listener.splice(this.on_finish_listener.indexOf(fn), 1);
  }

  protected abstract run_local(): Promise<void>;
}

export const get_value = (self: Command, other: Command): any =>  {
  let index = other.get_output_index(self);
  if (index) {
    other.get_value(index);
  }
  throw "No index supplied to get_value";
}