import { Program_UI_Control } from "../control/program_UI_Control";
import { Dropdown } from "../dropdown";

export interface Input_container {
  dropdown?: Dropdown;
  control: Program_UI_Control;
  parent: HTMLElement;
};