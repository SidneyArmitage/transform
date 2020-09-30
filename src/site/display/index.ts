import { createSection, Dropdown } from "../dropdown";
import { InputContainer} from "../factories";
import * as input from "../factories/input";
import * as endpoint from "../factories/endpoint";
import { ProgramUIControl } from "../control/programUIControl";

export default () => {
  const display = document.getElementById("display");
  if(display === null) {
    throw Error("Unable to find display");
  }
  const elements = [];
  const inputContainer: InputContainer = {
    control: new ProgramUIControl(),
    parent: display,
  };
  elements.push(input.section(inputContainer));
  elements.push(endpoint.section(inputContainer));
  
  const dropdown = new Dropdown(display, elements);
  inputContainer.dropdown = dropdown;
};