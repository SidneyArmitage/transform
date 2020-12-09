import { I_created } from "./created.js";

export type message_data = I_response;

export interface I_response {
  type: "response";
  message_id: number;
  command: I_success | I_error;
}
export interface I_success {
  reference_id: number;
  success: true;
  data: I_created | undefined;
};

export interface I_error {
  reference_id: number;
  success: false;
  data: string;
};