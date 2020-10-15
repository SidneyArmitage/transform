import { Command } from "../display/command.ts";

export class Program_UI_Control {
  private id: number;
  private commands: Command[];
  
  constructor(id: number = 0) {
    this.id = id;
    this.commands = [];
  }

  public add_command(command: Command) {
    this.commands.push(command);
  }

}