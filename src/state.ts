import { createInterface, type Interface } from "readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
  read: Interface;
  commands: Record<string, CLICommand>;
  nextLocationsURL: string;
  pokeapi: PokeAPI;
  previousLocationsURL: string;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(): State {
  const pokeAPI = new PokeAPI();
  return {
    read: createInterface({
      input: stdin,
      output: stdout,
      prompt: "Pokedex > ",
    }),
    commands: getCommands(),
    pokeapi: pokeAPI,
    nextLocationsURL: "",
    previousLocationsURL: "",
  };
}
