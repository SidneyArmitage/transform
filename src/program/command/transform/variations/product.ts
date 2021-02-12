import { Program } from "../../../program";
import { Primitive } from "../../../types/primitive.js";
import { Transform } from "../transform.js";

export class Product extends Transform {

  private type: Primitive[];

  constructor (program: Program, id?: number) {
    super(program, [0], id);
    this.type = [Primitive.NUMBER];
  }

  public get_type_input(index: number): number {
    return Primitive.BIGINT | Primitive.NUMBER;
  }
  public get_type_output(index: number): number {
    return this.type[index];
  }
  protected async run_local(): Promise<void> {
    let value = 1;
    if (this.get_all_inputs().length === 0) {
      this.value[0] = 0;
      return;
    }
    for (let current of this.get_all_inputs()) {
      const current_index = current?.get_output_index(this);
      if (current_index !== undefined) {
        value *= current.get_value(current_index);
      }
    }
    this.value[0] = value;
  }

}