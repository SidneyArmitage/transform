import { Worker_control } from "..";

export const assign_id = (message_id: number, id: number, control: Worker_control) => {
  control.send_message("response", {
    id: id,
    reference_id: message_id,
  });
};