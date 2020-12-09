import { from_primitive, Primitive, to_primitive } from "./primitive";

describe("to_primitive", () => {

  test("bigint", () => {
    expect(to_primitive("bigint")).toBe(0b1);
  });

  test("boolean", () => {
    expect(to_primitive("boolean")).toBe(0b10);
  });

  test("number", () => {
    expect(to_primitive("number")).toBe(0b100);
  });

  test("object", () => {
    expect(to_primitive("object")).toBe(0b1000);
  });

  test("string", () => {
    expect(to_primitive("string")).toBe(0b10000);
  });

  test("undefined", () => {
    expect(to_primitive("undefined")).toBe(0b100000);
  });

  test("any", () => {
    expect(to_primitive("any")).toBe(0b0);
  });
  
});

describe("from_primitive", () => {

  test("bigint", () => {
    expect(from_primitive(0b1)).toStrictEqual(["bigint"]);
  });

  test("boolean", () => {
    expect(from_primitive(0b10)).toStrictEqual(["boolean"]);
  });

  test("number", () => {
    expect(from_primitive(0b100)).toStrictEqual(["number"]);
  });

  test("object", () => {
    expect(from_primitive(0b1000)).toStrictEqual(["object"]);
  });

  test("string", () => {
    expect(from_primitive(0b10000)).toStrictEqual(["string"]);
  });

  test("undefined", () => {
    expect(from_primitive(0b100000)).toStrictEqual(["undefined"]);
  });

  test("any", () => {
    expect(from_primitive(0b111111)).toStrictEqual([
      "bigint",
      "boolean",
      "number",
      "object",
      "string",
      "undefined",
    ]);
  });

});