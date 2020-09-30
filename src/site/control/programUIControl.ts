import { Command } from "../display/command.ts";

export class ProgramUIControl {
  private id: number;
  private commands: Command[];
  
  constructor(id: number = 0) {
    this.id = id;
    this.commands = [];
  }

  public popID(): number {
    return this.id++;
  }

  public addCommand(command: Command) {
    this.commands.push(command);
  }

}