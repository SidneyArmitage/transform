import { InputContainer } from "..";
import { Log_command } from "../../display/command.ts/endpoint/log";
import { createItem, createSection } from "../../dropdown";

export const section = (inputs: InputContainer): HTMLElement => {
  
  const elements = [];
  elements.push(createItem("Log", () => {
    if (!inputs.dropdown) {
      throw Error("Unable to get dropdown");
    }
    inputs.control.addCommand(new Log_command(inputs.dropdown.getPosition(), inputs.control.popID(), inputs.parent));
  }));
  return createSection("Endpoint", elements);
}