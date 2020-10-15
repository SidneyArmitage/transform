export type command_instruction = I_listener_add | I_attach;

export interface I_listener_add {
  type: "add_listener";
}

export interface I_attach {
  type: "attach";
  id: number;
}