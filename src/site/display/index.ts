import { Dropdown } from "../dropdown";
import { Input_container} from "../factories";
import * as input from "../factories/input";
import * as endpoint from "../factories/endpoint";
import { Program_UI_Control } from "../control/programUIControl";

export default () => {
  const display = document.getElementById("display");
  if(display === null) {
    throw Error("Unable to find display");
  }
  const elements = [];
  const inputContainer: Input_container = {
    control: new Program_UI_Control(),
    parent: display,
  };
  elements.push(input.section(inputContainer));
  elements.push(endpoint.section(inputContainer));
  
  const dropdown = new Dropdown(display, elements);
  inputContainer.dropdown = dropdown;
};