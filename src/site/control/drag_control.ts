import { Point } from "../../util";
import { Command } from "../display/command";

export interface I_movable {
  on_move(position: Point): void;
}

export class Drag_control {
  private element: HTMLElement;
  private moving: I_movable | null;
  private selected: HTMLElement | null;
  private move_fn: (event: MouseEvent) => void;
  private stop_fn: () => void;

  constructor(element: HTMLElement) {
    this.element = element;
    this.moving = null;
    this.selected = null;
    this.move_fn = (event) => this.on_move(event);
    this.stop_fn = () => this.stop_move();
  }

  public start_move (command: I_movable, selected: HTMLElement) {
    this.moving = command;
    this.selected = selected;
    this.element.addEventListener("mousemove", this.move_fn);
    this.element.addEventListener("mouseup", this.stop_fn);
    this.selected.addEventListener("mouseup", this.stop_fn);
  }

  public stop_move () {
    this.element.removeEventListener("mousemove", this.move_fn);
    this.element.removeEventListener("mouseup", this.stop_fn);
    if (this.selected == null) {
      throw Error("no selected command");
    }
    this.selected.addEventListener("mouseup", this.stop_fn);
    this.moving = null;
    this.selected = null;
  }


  public on_move (event: MouseEvent): void {
    if (this.moving == null) {
      throw Error("no selected command");
    }
    this.moving.on_move({
      x: event.pageX,
      y: window.innerHeight - event.pageY,
    });
  }

}