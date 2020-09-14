import { Endpoint } from "../endpoint";

export class Log extends Endpoint {
  protected async run_local(): Promise<void> {
    this.get_inputs().forEach(e => console.log(e));
  }

}