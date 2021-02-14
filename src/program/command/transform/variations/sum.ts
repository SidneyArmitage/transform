import { Program } from "../../../program";
import { Primitive } from "../../../types/primitive";
import { Transform } from "../transform";

export class Sum extends Transform {

  private type: Primitive[];

  constructor (program: Program, id?: number) {
    super(program, [0], id);
    this.type = [Primitive.NUMBER];
  }

  public get_type_input(index: number): number {
    return Primitive.BIGINT | Primitive.NUMBER | Primitive.STRING;
  }
  public get_type_output(index: number): number {
    return this.type[index];
  }
  protected async run_local(): Promise<void> {
    let value = 0;
    for (let current of this.get_all_inputs()) {
      const current_index = current?.get_output_index(this);
      if (current_index !== undefined) {
        value += current.get_value(current_index);
      }
    }
    this.value[0] = value;
  }

}