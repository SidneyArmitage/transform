import { ICommand } from "../display/command";
import { Input_container } from "../factories";
import { create_log } from "../message/program/create_command";

export const create_section = (name: string, content: HTMLElement[]): HTMLElement => {
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown-section");
  // tag
  const tag = document.createElement("span");
  tag.classList.add("dropdown-section-tag");
  tag.textContent = name;
  dropdown.appendChild(tag);

  // container
  const container = document.createElement("div");
  container.classList.add("dropdown-section-content");
  content.forEach((item) => container.appendChild(item));
  dropdown.appendChild(container);
  return dropdown;
};

export const create_item = (name: string, action: () => void): HTMLElement => {
  const item = document.createElement("button");
  item.classList.add("dropdown-item");
  item.textContent = name;
  item.addEventListener("click", action);
  return item;
}

export const create_command = async (Class: ICommand, inputs: Input_container) => {
  if (!inputs.dropdown) {
    throw Error("Unable to get dropdown");
  }
  const pos = inputs.dropdown.get_position();
  const response = await inputs.worker.send_message("program", create_log);
  inputs.control.add_command(new Class(pos, inputs.control, inputs.parent, response.id));
}