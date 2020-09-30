import { InputContainer } from "..";
import { Scalar_manual_command } from "../../display/command.ts/input/scalar_manual";
import { createItem, createSection } from "../../dropdown"

export const section = (inputs: InputContainer): HTMLElement => {
  
  const elements = [];
  elements.push(createItem("Manual Scalar", () => {
    if (!inputs.dropdown) {
      throw Error("Unable to get dropdown");
    }
    inputs.control.addCommand(new Scalar_manual_command(inputs.dropdown.getPosition(), inputs.control.popID(), inputs.parent));
  }));
  elements.push(createItem("test", () => {}));
  return createSection("Input", elements);
}