import { Cache } from './pokecache.js';

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

export interface Area {
  name: string;
  url: string;
}

export interface Index {
  game_index: number;
  generation: Generation;
}

export interface Generation {
  name: string;
  url: string;
}

export interface Name {
  language: Language;
  name: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface Region {
  name: string;
  url: string;
}

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(10000);

  constructor() {}

  async fetchLocations(
    pageURL?: string,
  ): Promise<ShallowLocations | undefined> {
    if (!pageURL) {
      pageURL = `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;
    }

    let cacheEntry = this.#cache.get(pageURL); 
    if (cacheEntry) {
      return Promise.resolve(cacheEntry as ShallowLocations | undefined);
    }


    try {
      const response = await fetch(pageURL);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      const result = (await response.json()) as ShallowLocations;
      this.#cache.add(pageURL, result);
      return result;
    } catch (err) {
      console.error((err as Error).message);
    }

    return undefined;
  }

  async fetchLocation(locationName: string): Promise<Location | undefined> {
    const locationURL = `${PokeAPI.baseURL}/location/${locationName}`;

    let cacheEntry = this.#cache.get(locationURL);
    if (cacheEntry) {
      return Promise.resolve(cacheEntry as Location | undefined);
    }

    try {
      const response = await fetch(locationURL);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      const result = (await response.json()) as Location;
      this.#cache.add(locationURL, result);
      return result;
    } catch (err) {
      console.error((err as Error).message);
    }

    return undefined;
  }
}
