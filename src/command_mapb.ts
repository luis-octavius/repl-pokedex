import { type State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
  const previousURL = state.previousLocationsURL;
  if (previousURL === null) {
    console.log("you're on the first page");
    return;
  }

  const result = await state.pokeapi.fetchLocations(state.previousLocationsURL);

  if (result === undefined) {
    return;
  }

  for (const data of result.results) {
    console.log(data.name);
  }

  state.previousLocationsURL = result.previous as string;
  state.nextLocationsURL = result.next as string;
}
