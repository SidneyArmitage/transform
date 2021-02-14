import { Input_container } from "..";
import { Divide_command } from "../../display/command/transform/divide";
import { Product_command } from "../../display/command/transform/product";
import { Subtract_command } from "../../display/command/transform/subtract";
import { Sum_command } from "../../display/command/transform/sum";
import { create_item, create_section } from "../../dropdown"
import { create_divide, create_product, create_subtract, create_sum } from "../../message/program/create_command";

export const section = (inputs: Input_container): HTMLElement => {
  
  const elements = [];
  elements.push(create_item("Divide", async () => {
    if (!inputs.dropdown) {
      throw Error("Unable to get dropdown");
    }
    const pos = inputs.dropdown.get_position();
    console.log("adding");
    const response = await inputs.worker.send_message("program", create_divide);
    console.log("added");
    inputs.control.add_command(new Divide_command(pos, inputs.control, inputs.parent, response.id));
  }));
  elements.push(create_item("Product", async () => {
    if (!inputs.dropdown) {
      throw Error("Unable to get dropdown");
    }
    const pos = inputs.dropdown.get_position();
    console.log("adding");
    const response = await inputs.worker.send_message("program", create_product);
    console.log("added");
    inputs.control.add_command(new Product_command(pos, inputs.control, inputs.parent, response.id));
  }));
  elements.push(create_item("Subtract", async () => {
    if (!inputs.dropdown) {
      throw Error("Unable to get dropdown");
    }
    const pos = inputs.dropdown.get_position();
    console.log("adding");
    const response = await inputs.worker.send_message("program", create_subtract);
    console.log("added");
    inputs.control.add_command(new Subtract_command(pos, inputs.control, inputs.parent, response.id));
  }));
  elements.push(create_item("Sum", async () => {
    if (!inputs.dropdown) {
      throw Error("Unable to get dropdown");
    }
    const pos = inputs.dropdown.get_position();
    console.log("adding");
    const response = await inputs.worker.send_message("program", create_sum);
    console.log("added");
    inputs.control.add_command(new Sum_command(pos, inputs.control, inputs.parent, response.id));
  }));
  return create_section("Transform", elements);
}