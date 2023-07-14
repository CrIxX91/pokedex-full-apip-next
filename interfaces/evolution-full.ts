// Generated by https://quicktype.io

export interface IEvolution {
    baby_trigger_item: null;
    chain:             Chain;
    id:                number;
}

export interface Chain {
    evolution_details: any[];
    evolves_to:        EvolvesTo[];
    is_baby:           boolean;
    species:           ChainSpecies;
}

export interface EvolvesTo {
    evolution_details: SpeciesElement[];
    evolves_to:        EvolvesTo[];
    is_baby:           boolean;
    species:           SpeciesElement;
}

export interface SpeciesElement {
    name: string;
    url:  string;
}

export interface ChainSpecies {
    name: string;
    url:  string;
}
