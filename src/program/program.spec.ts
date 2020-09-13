import { Program } from "./program";

test("run", async () => {
  const program = new Program();
  program.run();
});

test("stop", () => {
  const program = new Program();
  program.stop("testing stop");
});