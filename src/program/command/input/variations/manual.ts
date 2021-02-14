import { Program } from "../../../program";
import { Primitive, to_primitive } from "../../../types/primitive";
import { Input } from "../input";

export class Manual extends Input {

  private type: Primitive[];

  constructor(program: Program, value: any[], id?: number) {
    super(program, value, id);
    this.type = value.map(v => to_primitive(typeof v));
  }  

  public set_value (value: any[]) {
    this.value = value;
    this.type = value.map(v => to_primitive(typeof v));
  }

  public get_type_output(index: number): number {
    return this.type[index];
  }

  protected async run_local(): Promise<void> {
    // Nothing happens here as there is no processing required.
  }

}