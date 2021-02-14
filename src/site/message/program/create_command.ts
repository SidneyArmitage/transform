import { I_create } from "../../../worker/types/in/program/create";


export const create_manual: I_create = ({
  type: "create",
  command: {
    type: "manual_scalar",
    describe: {
      type: "string",
      value: "",
    },
  },
});

export const create_log: I_create = ({
  type: "create",
  command: {
    type: "log",
  },
});

export const create_divide: I_create = ({
  type: "create",
  command: {
    type: "divide",
  },
});

export const create_product: I_create = ({
  type: "create",
  command: {
    type: "product",
  },
});

export const create_subtract: I_create = ({
  type: "create",
  command: {
    type: "subtract",
  },
});

export const create_sum: I_create = ({
  type: "create",
  command: {
    type: "sum",
  },
});
