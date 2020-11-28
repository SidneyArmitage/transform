import { I_created } from "./created";

export type message_data = I_response;

export interface I_response {
  message_id: number;
  type: "response";
  command: I_created;
};