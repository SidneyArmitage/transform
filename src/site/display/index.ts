import { createSection, Dropdown } from "../dropdown";
import { DropdownContainer} from "../factories";
import * as input from "../factories/input";
import * as endpoint from "../factories/endpoint";

export default () => {
  const display = document.getElementById("display");
  if(display === null) {
    throw Error("Unable to find display");
  }
  const elements = [];
  const dropdownContainer: DropdownContainer = {};
  elements.push(input.section(dropdownContainer));
  elements.push(endpoint.section(dropdownContainer));
  
  const dropdown = new Dropdown(display, elements);
  dropdownContainer.dropdown = dropdown;
};