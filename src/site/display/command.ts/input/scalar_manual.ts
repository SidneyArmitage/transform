import { Command } from "..";
import { Point } from "../../../../util";

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

  constructor(pos: Point, id: number, parent: HTMLElement) {
    super(pos, id, parent, "Manual Scalar");

    const typeLabel = document.createElement("label");
    typeLabel.textContent = "type";
    typeLabel.htmlFor = `scalar-manual-${id}-type`;
    
    const typeSelect = document.createElement("select");
    typeSelect.id = `scalar-manual-${id}-type`;
    typeSelect.appendChild(createOption("number", "number"));
    typeSelect.appendChild(createOption("string", "string"));
    typeSelect.appendChild(createOption("boolean", "boolean"));
    typeSelect.value = "number";
    this.type = "number";
    typeSelect.addEventListener("change", (event: Event) => this.changeType((event.target as HTMLSelectElement).value));

    const valueLabel = document.createElement("label");
    valueLabel.textContent = "value";
    valueLabel.htmlFor = `scalar-manual-${id}-value`;

    this.valueInput = document.createElement("input");
    this.valueInput.type = "number";
    this.valueInput.value = "0";
    this.valueInput.id = `scalar-manual-${id}-value`;

    this.area.appendChild(typeLabel);
    this.area.appendChild(valueLabel);
    this.area.appendChild(typeSelect);
    this.area.appendChild(this.valueInput);
    this.area.classList.add("scalar-manual");
  }

  public getValue (): Primitive {
    return this.type === "number" ? Number.parseFloat(this.valueInput.value) : this.type === "boolean" ? (this.valueInput.value === "true" ? true : false) : this.valueInput.value;
  }

  public changeType (type: string) {
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