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


export interface TargetLocation {
  id: number
  name: string
  game_index: number
  encounter_method_rates: EncounterMethodRate[]
  location: Location
  names: Name[]
  pokemon_encounters: PokemonEncounter[]
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod
  version_details: VersionDetail[]
}

export interface EncounterMethod {
  name: string
  url: string
}

export interface VersionDetail {
  rate: number
  version: Version
}

export interface Version {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}

export interface Name {
  name: string
  language: Language
}

export interface Language {
  name: string
  url: string
}

export interface PokemonEncounter {
  pokemon: Pokemon
  version_details: VersionDetail2[]
}

export interface Pokemon {
  name: string
  url: string
}

export interface VersionDetail2 {
  version: Version2
  max_chance: number
  encounter_details: EncounterDetail[]
}

export interface Version2 {
  name: string
  url: string
}

export interface EncounterDetail {
  min_level: number
  max_level: number
  condition_values: any[]
  chance: number
  method: Method
}

export interface Method {
  name: string
  url: string
}
