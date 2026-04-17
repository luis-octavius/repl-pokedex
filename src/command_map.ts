import { type State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  const result = await state.pokeapi.fetchLocations(state.nextLocationsURL);

  if (result === undefined) {
    return;
  }

  for (const data of result.results) {
    console.log(data.name);
  }

  state.previousLocationsURL = result.previous as string;
  state.nextLocationsURL = result.next as string;
}
