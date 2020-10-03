import { Program } from "../../../program";
import { Command } from "../../command";
import { Input } from "../input";

export class Manual<T> extends Input<T> {

  constructor(program: Program, value: T, id?: number) {
    super(program, value, id);
  }  

  public set_value (value: T) {
    this.value = value;
  }

  protected async run_local(): Promise<void> {
    // Nothing happens here as there is no processing required.
  }

}