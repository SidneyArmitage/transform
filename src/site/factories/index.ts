import { Program_UI_Control } from "../control/programUIControl";
import { Dropdown } from "../dropdown";

export interface Input_container {
  dropdown?: Dropdown;
  control: Program_UI_Control;
  parent: HTMLElement;
};