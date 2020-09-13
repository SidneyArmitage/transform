import { Program } from "../../../program";
import { Input } from "../input";

export class Manual<T> extends Input<T> {

  constructor(program: Program, value: T) {
    super(program, value)
  }  

  public set_value (value: T) {
    this.value = value;
  }

  protected async run_local(): Promise<void> {
    // Nothing happens here as there is no processing required.
  }

}