export enum Primitive {
  BIGINT = 0b1,
  BOOLEAN = 0b10,
  NUMBER = 0b100,
  OBJECT = 0b1000,
  STRING = 0b10000,
  UNDEFINED = 0b100000,
};

export const to_primitive = (type: string): Primitive => {
  switch (type) {
    case "bigint":
      return Primitive.BIGINT;
    case "boolean": 
      return Primitive.BOOLEAN;
    case "number": 
      return Primitive.NUMBER;
    case "object":
      return Primitive.OBJECT;
    case "string":
      return Primitive.STRING;
    case "undefined":
      return Primitive.UNDEFINED;
    default:
      return 0;
  }
};

export const from_primitive = (primitive: number): string[] => ([
  ...(primitive & Primitive.BIGINT) !== 0 ? ["bigint"] : [],
  ...(primitive & Primitive.BOOLEAN) !== 0 ? ["boolean"] : [],
  ...(primitive & Primitive.NUMBER) !== 0 ? ["number"] : [],
  ...(primitive & Primitive.OBJECT) !== 0 ? ["object"] : [],
  ...(primitive & Primitive.STRING) !== 0 ? ["string"] : [],
  ...(primitive & Primitive.UNDEFINED) !== 0 ? ["undefined"] : [],
]);