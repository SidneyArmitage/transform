import { Program } from "../../../program";
import { Primitive } from "../../../types/primitive.js";
import { Transform } from "../transform.js";

export class Divide extends Transform {

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
    const numerator = this.get_input(0);
    const numerator_index = numerator?.get_output_index(this);
    const denominator = this.get_input(1);
    const denominator_index = denominator?.get_output_index(this);
    console.log(numerator_index, denominator_index);
    if (numerator && denominator && numerator_index !== undefined && denominator_index !== undefined) {
      this.value[0] = (numerator.get_value(numerator_index) / denominator.get_value(denominator_index)) as any;
    }
  }

}