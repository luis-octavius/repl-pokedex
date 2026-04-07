import { CLICommand } from "./commands.js";

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log("Welcome to the Pokedex!\n");
  console.log("Usage: \n");

  for (const key of Object.keys(commands)) {
    console.log(`${commands[key].name}: ${commands[key].description}`);
  }
}
