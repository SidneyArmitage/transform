import { Input_container } from "..";
import { Log_command } from "../../display/command.ts/endpoint/log";
import { create_item, create_section } from "../../dropdown";
import { create_log } from "../../message/program/create_command";

export const section = (inputs: Input_container): HTMLElement => {
  
  const elements = [];
  elements.push(create_item("Log", async () => {
    if (!inputs.dropdown) {
      throw Error("Unable to get dropdown");
    }
    const pos = inputs.dropdown.get_position();
    const response = await inputs.worker.send_message("program", create_log);
    inputs.control.add_command(new Log_command(pos, inputs.control, inputs.parent, response.id));
  }));
  return create_section("Endpoint", elements);
}