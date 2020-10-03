import { Input_container } from "..";
import { Scalar_manual_command } from "../../display/command.ts/input/scalar_manual";
import { create_item, create_section } from "../../dropdown"

export const section = (inputs: Input_container): HTMLElement => {
  
  const elements = [];
  elements.push(create_item("Manual Scalar", () => {
    if (!inputs.dropdown) {
      throw Error("Unable to get dropdown");
    }
    inputs.control.add_command(new Scalar_manual_command(inputs.dropdown.get_position(), inputs.control.pop_id(), inputs.parent));
  }));
  elements.push(create_item("test", () => {}));
  return create_section("Input", elements);
}