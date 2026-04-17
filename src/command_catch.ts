import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    return;
  }

  const pokemonName = args[0];

  const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
  if (pokemon === undefined) {
    console.log(`${pokemonName} does not exist or has a typo`);
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemon.name}...`);

  const isCaptured = captureChance(pokemon.base_experience)
  if (!isCaptured) {
    console.log(`${pokemon.name} escaped!`)
  } else {
    console.log(`${pokemon.name} was caugth!`)
    state.pokedex[pokemon.name] = pokemon;
  }
}

function captureChance(baseExp: number): boolean {
  const baseChance = 100 - (baseExp / 4);

  // determines luck
  const luckRoll = Math.random();
  let luckMultiplier: number;

  if (luckRoll < 0.33) {
    luckMultiplier = 0.5;
  } else if (luckRoll < 0.66) {
    luckMultiplier = 1.0;
  } else {
    luckMultiplier = 1.5;
  }

  // applies the luck multiplier to base chance
  let finalChance = baseChance * luckMultiplier;

  // garantees that the chance stays between 0 and 100 
  finalChance = Math.max(0, Math.min(100, finalChance));

  // generate random number to try to catch 
  const captureRoll = Math.random() * 100; 

  // determines if it was captured 
  const success = captureRoll <= finalChance; 

  return success;
}
