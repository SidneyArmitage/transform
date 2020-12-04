import { Input_container } from "..";
import { Scalar_manual_command } from "../../display/command.ts/input/scalar_manual";
import { create_item, create_section } from "../../dropdown"
import { create_manual } from "../../message/program/create_command";

export const section = (inputs: Input_container): HTMLElement => {
  
  const elements = [];
  elements.push(create_item("Manual Scalar", async () => {
    if (!inputs.dropdown) {
      throw Error("Unable to get dropdown");
    }
    const pos = inputs.dropdown.get_position();
    console.log("adding");
    const response = await inputs.worker.send_message("program", create_manual);
    console.log("added");
    inputs.control.add_command(new Scalar_manual_command(pos, inputs.control, inputs.parent, response.id));
  }));
  return create_section("Input", elements);
}