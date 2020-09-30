import { ProgramUIControl } from "../control/programUIControl";
import { Dropdown } from "../dropdown";

export interface InputContainer {
  dropdown?: Dropdown;
  control: ProgramUIControl;
  parent: HTMLElement;
};