import { Command_instruction } from "../../worker/types/in/command";
import { Program_instruction } from "../../worker/types/in/program";
import { I_created } from "../../worker/types/out/created"
import { message_data, I_response } from "../../worker/types/out/";

export class Worker_control {
  private index: number;
  private worker: Worker;
  private waiting: Map<number, (response: I_created) => void>;
  constructor() {
    this.index = 0;
    this.worker = new Worker("./worker.js");
    this.waiting = new Map();
    // @ts-ignore
    this.worker.addEventListener("message", (event: MessageEvent<Message_data>) => this.process_message(event));
  }

  private async process_response(data: I_created) {
    const fn = this.waiting.get(data.reference_id)
    if(fn){
      try {
        await fn(data);
      } finally {
        this.waiting.delete(data.reference_id);
      }
    };
  }

  private process_message(event: MessageEvent<message_data>) {
    switch(event.data.type) {
      case "response":
        this.process_response(event.data.command);
        break;
      default:
        throw Error(`unexpected response ${event.data.type}`);
    }
  }
  public send_message (type: "program" | "command", command: Program_instruction | Command_instruction): Promise<I_created> {
    return new Promise ((resolve, reject) => {
      const id = this.index++;
      const message = {
        command: command,
        message_id: id,
        type: type,
      };
      console.log("sending", message);
      try {
        this.worker.postMessage(message);
        this.waiting.set(id, (response: I_created) => {
          resolve(response);
        });
      } catch (err) {
        console.error("unable to post to worker", err);
        reject(message);
      }
    });
  }
}