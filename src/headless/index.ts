import { readFileSync } from "fs";
import { join } from "path";
import { I_input, parse } from "./parse.js";

const main = async (args: string[]) => {
    console.log(args);
    const input = JSON.parse(readFileSync(join("./",args[2])).toString());
    const program = parse(input as I_input);
    await program.run();
};
main(process.argv);