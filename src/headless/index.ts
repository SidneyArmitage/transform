import { readFileSync } from "fs";
import { join } from "path";
import { I_input, parse } from "./parse";

const main = (args: string[]) => {
    const input = JSON.parse(readFileSync(join("./",args[2])).toString());
    const program = parse(input as I_input);
    program.run();
};