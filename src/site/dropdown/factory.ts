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