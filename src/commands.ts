import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { type CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Shows help",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Shows the next location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Shows the previous location areas",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Shows the pokemons in a specific location",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Captures a pokemon",
      callback: commandCatch,
    }
  };
}
