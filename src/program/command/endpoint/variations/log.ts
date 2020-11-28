import { Endpoint } from "../endpoint";

export class Log extends Endpoint {
  protected async run_local(): Promise<void> {
    this.get_all_inputs().forEach(e => console.log(e.get_value()));
  }

}