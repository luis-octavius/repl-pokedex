import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    return;
  }
  const location = args[0];
  const result = await state.pokeapi.fetchLocationPokemons(location);

  if (result === undefined) {
    return;
  }

  console.log(`Exploring ${location}...`)

  const encounters = result.pokemon_encounters;

  if (encounters.length === 0) {
    console.log("There are no pokemons on this area");
    return;
  }

  for (const encounter of encounters) {
    console.log(`- ${encounter.pokemon.name}`)
  } 
}
