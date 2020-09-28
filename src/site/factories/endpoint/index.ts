import { DropdownContainer } from "..";
import { createItem, createSection } from "../../dropdown";

export const section = (dropdown: DropdownContainer): HTMLElement => {
  
  const elements = [];
  elements.push(createItem("Log", () => {
    if (dropdown.dropdown) {
      throw Error("Unable to get dropdown");
    }
  }));
  return createSection("Endpoint", elements);
}