import { type State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("Welcome to the Pokedex!\n");
  console.log("Usage: \n");

  const commands = state.commands;

  for (const key of Object.keys(commands)) {
    console.log(`${commands[key].name}: ${commands[key].description}`);
  }
}
