import { Input_container } from "..";
import { Log_command } from "../../display/command.ts/endpoint/log";
import { create_item, create_section } from "../../dropdown";

export const section = (inputs: Input_container): HTMLElement => {
  
  const elements = [];
  elements.push(create_item("Log", () => {
    if (!inputs.dropdown) {
      throw Error("Unable to get dropdown");
    }
    inputs.control.add_command(new Log_command(inputs.dropdown.get_position(), inputs.control.pop_id(), inputs.parent));
  }));
  return create_section("Endpoint", elements);
}