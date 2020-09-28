import { DropdownContainer } from "..";
import { createItem, createSection } from "../../dropdown"

export const section = (dropdown: DropdownContainer): HTMLElement => {
  
  const elements = [];
  elements.push(createItem("Scalar", () => {
    if (dropdown.dropdown) {
      throw Error("Unable to get dropdown");
    }
  }));
  elements.push(createItem("test", () => {}));
  return createSection("Input", elements);
}