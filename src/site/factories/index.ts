import { Program_UI_Control } from "../control/program_UI_Control";
import { Worker_control } from "../control/worker_control";
import { Dropdown } from "../dropdown";

export interface Input_container {
  dropdown?: Dropdown;
  control: Program_UI_Control;
  worker: Worker_control;
  parent: HTMLElement;
};