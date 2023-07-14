
import { Sprites, Ability, Stat, Type } from './pokemon-full';

export interface NewPokemon{
    name: string;
    sprites: Sprites;
    types: Type[];
    id: number;
    height: number;
    weight: number;
    abilities: Ability[];
    stats: Stat[];
}

export interface NewTypesApi{
    name:string
}

export interface NewAbility {
    name:string
}
export interface NewPokemonApi{
    name:string;
    sprites: Sprites;
    type: NewTypesApi[];
    id: number;
    height: number;
    weight: number;
    abilities: NewAbility[];
    stats: Stat[];

}