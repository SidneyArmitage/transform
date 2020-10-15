export type Manual = I_manual_boolean | I_manual_number | I_manual_string;

export interface I_manual {
  type: "manual_scalar";
  describe: Manual;
}

export interface I_manual_string {
  type: "string";
  value: string;
}

export interface I_manual_number {
  type: "number";
  value: number;
}

export interface I_manual_boolean {
  type: "boolean";
  value: boolean;
}