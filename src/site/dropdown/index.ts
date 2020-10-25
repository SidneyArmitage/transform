import { Point, zero } from "../../util";
export * from "./factory";

export class Dropdown {

  private pos: Point;
  private isVisible: Boolean;
  private element: HTMLElement;
  private parent: HTMLElement;
  private click_fn: () => void;
  private on_context_menu_fn: (e: MouseEvent) => Boolean;

  constructor(parent: HTMLElement, items: HTMLElement[]) {
    this.pos = zero();
    this.isVisible = false;
    this.element = document.createElement("div");
    this.element.classList.add("dropdown");
    this.parent = parent;
    items.forEach((item) => this.element.appendChild(item));
    this.parent.appendChild(this.element);
    this.click_fn = on_click(this);
    window.addEventListener("click", this.click_fn);
    this.on_context_menu_fn = on_context_menu(this);
    this.parent.addEventListener("contextmenu", this.on_context_menu_fn);
  }

  public set_visible(isVisible: Boolean) {
    this.isVisible = isVisible;
    this.element.style.display = this.isVisible ? "block" : "none";
  }

  public get_is_visible(): Boolean {
    return this.isVisible;
  }

  public set_position(pos: Point) {
    this.pos = pos;
    this.element.style.bottom = `${pos.y}px`;
    this.element.style.left = `${pos.x}px`;
  }

  public get_position() {
    return {
      ...this.pos,
    };
  }
}

const on_click = (dropdown: Dropdown) => () => {
  if (!dropdown.get_is_visible()) {
    return;
  }
  dropdown.set_visible(false);
};

const on_context_menu = (dropdown: Dropdown) => (e: MouseEvent): Boolean => {
  dropdown.set_position({
    x: e.pageX,
    y: window.innerHeight - e.pageY,
  });
  dropdown.set_visible(true);
  e.preventDefault();
  return false;
}