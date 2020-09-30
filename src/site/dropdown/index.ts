import { Point, zero } from "../../util";
export * from "./factory";

export class Dropdown {

  private pos: Point;
  private isVisible: Boolean;
  private element: HTMLElement;
  private parent: HTMLElement;
  private clickFunction: () => void;
  private onContextMenuFunction: (e: MouseEvent) => Boolean;

  constructor(parent: HTMLElement, items: HTMLElement[]) {
    this.pos = zero();
    this.isVisible = false;
    this.element = document.createElement("div");
    this.element.classList.add("dropdown");
    this.parent = parent;
    items.forEach((item) => this.element.appendChild(item));
    this.parent.appendChild(this.element);
    this.clickFunction = onClick(this);
    window.addEventListener("click", this.clickFunction);
    this.onContextMenuFunction = onContextMenu(this);
    this.parent.addEventListener("contextmenu", this.onContextMenuFunction);
  }

  public setVisible(isVisible: Boolean) {
    this.isVisible = isVisible;
    this.element.style.display = this.isVisible ? "block" : "none";
  }

  public getIsVisible(): Boolean {
    return this.isVisible;
  }

  public setPosition(pos: Point) {
    console.log(pos);
    this.pos = pos;
    this.element.style.bottom = `${pos.y}px`;
    this.element.style.left = `${pos.x}px`;
  }

  public getPosition() {
    return {
      ...this.pos,
    };
  }
}

const onClick = (dropdown: Dropdown) => () => {
  if (!dropdown.getIsVisible()) {
    return;
  }
  dropdown.setVisible(false);
};

const onContextMenu = (dropdown: Dropdown) => (e: MouseEvent): Boolean => {
  dropdown.setPosition({
    x: e.pageX,
    y: window.innerHeight -e.pageY,
  });
  dropdown.setVisible(true);
  e.preventDefault();
  return false;
}