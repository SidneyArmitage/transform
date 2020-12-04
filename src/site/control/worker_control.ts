import { I_command } from "../../worker/types/in/";
import { Program_instruction } from "../../worker/types/in/program";
import { I_created } from "../../worker/types/out/created"
import { I_error, I_success, message_data } from "../../worker/types/out/";

export class Worker_control {
  private index: number;
  private worker: Worker;
  private waiting: Map<number, (response: I_created | undefined) => void>;
  constructor() {
    this.index = 0;
    this.worker = new Worker("./worker.js");
    this.waiting = new Map();
    // @ts-ignore
    this.worker.addEventListener("message", (event: MessageEvent<Message_data>) => this.process_message(event));
  }

  private async process_response(success: boolean, reference_id: number, data: I_created | string | undefined) {
    const fn = this.waiting.get(reference_id);
    if(fn){
      try {
        if(success) {
          await fn(data as I_created);
        }
      } finally {
        this.waiting.delete(reference_id);
      }
    };
  }

  private process_message(event: MessageEvent<message_data>) {
    switch(event.data.type) {
      case "response":
        this.process_response(event.data.command.success, event.data.command.reference_id, event.data.command.data);
        break;
      default:
        throw Error(`unexpected response ${event.data.type}`);
    }
  }

  public send_message (type: "program" | "command", command: Program_instruction | I_command): Promise<I_created> {
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
        this.waiting.set(id, (response: I_created | undefined) => {
          resolve(response);
        });
      } catch (err) {
        console.error("unable to post to worker", err);
        reject(message);
      }
    });
  }
}