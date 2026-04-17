import { Cache } from './pokecache.js';
import { Location, ShallowLocations, TargetLocation } from './types.js';

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
};

export interface Result {
  name: string;
  url: string;
}

export interface Location {
  areas: Area[];
  game_indices: Index[];
  id: number;
  name: string;
  names: Name[];
  region: Region;
}
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(10000);

  constructor() {}

  async fetchLocations(
    pageURL?: string,
  ): Promise<ShallowLocations> {
    if (!pageURL) {
      pageURL = `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;
    }

    let cacheEntry = this.#cache.get(pageURL); 
    if (cacheEntry) {
      return Promise.resolve(cacheEntry as ShallowLocations);
    }


    try {
      const response = await fetch(pageURL);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      const result = await response.json();
      this.#cache.add(pageURL, result);
      return result;
    } catch (err) {
      console.error(err)
      throw err;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const locationURL = `${PokeAPI.baseURL}/location/${locationName}`;

    let cacheEntry = this.#cache.get(locationURL);
    if (cacheEntry) {
      return Promise.resolve(cacheEntry as Location);
    }

    try {
      const response = await fetch(locationURL);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      const result = await response.json();
      this.#cache.add(locationURL, result);
      return result;
    } catch (err) {
      console.error((err as Error).message);
      throw err;
    }
  }

  async fetchLocationPokemons(locationName: string): Promise<TargetLocation> {
    const locationURL = `${PokeAPI.baseURL}/location-area/${locationName}`;

    let cacheEntry = this.#cache.get(locationURL);
    if (cacheEntry) {
      return Promise.resolve(cacheEntry as TargetLocation);
    }

    try {
      const response = await fetch(locationURL);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`)
      }

      const result = await response.json();
      this.#cache.add(locationURL, result);
      return result;
    } catch (err) {
      console.error((err as Error).message);
      throw err;
    }
  }
}
