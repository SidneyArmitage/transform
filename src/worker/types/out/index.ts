import { I_created } from "./created";

export type message_data = I_message_created;

export interface I_message_created {
  type: "created";
  command: I_created;
  message_id: number;
};