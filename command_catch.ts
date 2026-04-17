import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
  const pokemonName = args[0];

  const pokemon = state.pokeapi.async
}
