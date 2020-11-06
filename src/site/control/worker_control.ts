export class Worker_control {
  private index: number;
  private worker: Worker
  constructor() {
    this.index = 0;
    this.worker = new Worker("./worker.js");
  }

  private send_message () {
    const id = this.index++;
  }
}