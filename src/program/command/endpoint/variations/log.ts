import { Primitive } from "../../../types/primitive.js";
import { Endpoint } from "../endpoint.js";

export class Log extends Endpoint {
  protected async run_local(): Promise<void> {
    const obj = this.get_input(0);
    const index = obj?.get_output_index(this);
    if (index === undefined) {
      console.error("object not attached");
    } else {
      console.log(obj?.get_value(index));
    }
  }

  public get_type_input (index: number): number {
    return Primitive.BIGINT | Primitive.BOOLEAN | Primitive.NUMBER | Primitive.OBJECT | Primitive.STRING | Primitive.UNDEFINED;
  }

}