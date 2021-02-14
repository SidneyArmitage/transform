import { Command } from "..";
import { Point } from "../../../../util";
import { Program_UI_Control } from "../../../control/program_UI_Control";

const createOption = (name: string, value: string) => {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = name;
  return option;
}

type Primitive = string | number | boolean;

export class Scalar_manual_command extends Command {

  private type: string;
  private valueInput: HTMLInputElement;

  constructor(pos: Point, control: Program_UI_Control, parent: HTMLElement, id: number) {
    super(pos, control, parent, id, "Manual Scalar");

    const typeLabel = document.createElement("label");
    typeLabel.textContent = "type";
    typeLabel.htmlFor = `scalar-manual-${this.get_id()}-type`;
    
    const typeSelect = document.createElement("select");
    typeSelect.id = `scalar-manual-${this.get_id()}-type`;
    typeSelect.appendChild(createOption("number", "number"));
    typeSelect.appendChild(createOption("string", "string"));
    typeSelect.appendChild(createOption("boolean", "boolean"));
    typeSelect.value = "number";
    this.type = "number";
    typeSelect.addEventListener("change", (event: Event) => this.change_type((event.target as HTMLSelectElement).value));

    const valueLabel = document.createElement("label");
    valueLabel.textContent = "value";
    valueLabel.htmlFor = `scalar-manual-${this.get_id()}-value`;

    this.valueInput = document.createElement("input");
    this.valueInput.type = "number";
    this.valueInput.value = "0";
    this.valueInput.id = `scalar-manual-${this.get_id()}-value`;

    this.area.appendChild(typeLabel);
    this.area.appendChild(valueLabel);
    this.area.appendChild(typeSelect);
    this.area.appendChild(this.valueInput);
    this.area.classList.add("scalar-manual");
    this.output_add(0);
  }

  public get_value (): Primitive {
    return this.type === "number" ? Number.parseFloat(this.valueInput.value) : this.type === "boolean" ? (this.valueInput.value === "true" ? true : false) : this.valueInput.value;
  }

  public change_type (type: string) {
    switch(type) {
      case "number":
        this.valueInput.type = "number";
        this.valueInput.value = "0";
        break;
      case "string": 
        this.valueInput.type = "text";
        this.valueInput.value = "";
        break;
      case "boolean":
        this.valueInput.type = "checkbox";
        this.valueInput.value = "true";
        break;
      default:
        throw Error("invalid type set");
    }
    this.type = type;
  }
}