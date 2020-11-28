import { I_create } from "../../../worker/types/in/program/create";


export const create_manual: I_create = ({
  type: "create",
  command: {
    type: "manual_scalar",
    describe: {
      type: "string",
      value: "",
    },
  }
});

export const create_log: I_create = ({
  type: "create",
  command: {
    type: "log"
  }
});