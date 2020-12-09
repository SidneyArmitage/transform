import { Program } from "./program";

test("new", () => {
  const program = new Program();
});

test("set_counter", () => {
  const program = new Program();
  expect(program.set_counter(1)).toBe(true);
  expect(program.set_counter(1)).toBe(false);
});

test("pop_id", () => {
  const program = new Program();
  expect(program.pop_id()).toBe(0);
  expect(program.pop_id()).toBe(1);
});

test("run", async () => {
  const program = new Program();
  program.run();
});

test("stop", () => {
  const program = new Program();
  program.stop("testing stop");
});