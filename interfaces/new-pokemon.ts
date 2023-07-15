export interface INewPokemon {
    id:         number;
    created_at: string;
    name:       string;
    pokemon_id: number;
    sprites:    Sprites;
    types:      Type[];
    height:     number;
    weight:     number;
    abilities:  AbilityElement[];
    stats:      Stat[];
    aux_id:     number;
}

export interface AbilityElement {
    ability:   PurpleAbility;
    is_hidden: boolean;
    slot:      number;
}

export interface PurpleAbility {
    name: string;
}

export interface GenerationV {
    "black-white": Sprites;
}

export interface GenerationIv {
    "diamond-pearl":        Sprites;
    "heartgold-soulsilver": Sprites;
    platinum:               Sprites;
}

export interface Versions {
    "generation-i":    GenerationI;
    "generation-ii":   GenerationIi;
    "generation-iii":  GenerationIii;
    "generation-iv":   GenerationIv;
    "generation-v":    GenerationV;
    "generation-vi":   { [key: string]: Home };
    "generation-vii":  GenerationVii;
    "generation-viii": GenerationViii;
}

export interface Sprites {
    back_default:       null | string;
    back_female:        null | string;
    back_shiny:         null | string;
    back_shiny_female:  null | string;
    front_default:      null | string;
    front_female:       null | string;
    front_shiny:        null | string;
    front_shiny_female: null | string;
    other?:             Other;
    versions?:          Versions;
    animated?:          Sprites;
}

export interface GenerationI {
    "red-blue": RedBlue;
    yellow:     RedBlue;
}

export interface RedBlue {
    back_default:      null | string;
    back_gray:         null | string;
    back_transparent:  null | string;
    front_default:     null | string;
    front_gray:        null | string;
    front_transparent: null | string;
}

export interface GenerationIi {
    crystal: Crystal;
    gold:    Gold;
    silver:  Gold;
}

export interface Crystal {
    back_default:            null | string;
    back_shiny:              null | string;
    back_shiny_transparent:  null | string;
    back_transparent:        null | string;
    front_default:           null | string;
    front_shiny:             null | string;
    front_shiny_transparent: null | string;
    front_transparent:       null | string;
}

export interface Gold {
    back_default:       null | string;
    back_shiny:         null | string;
    front_default:      null | string;
    front_shiny:        null | string;
    front_transparent?: null | string;
}

export interface GenerationIii {
    emerald:             OfficialArtwork;
    "firered-leafgreen": Gold;
    "ruby-sapphire":     Gold;
}

export interface OfficialArtwork {
    front_default: null | string;
    front_shiny:   null | string;
}

export interface Home {
    front_default:      null | string;
    front_female:       null | string;
    front_shiny:        null | string;
    front_shiny_female: null | string;
}

export interface GenerationVii {
    icons:                  DreamWorld;
    "ultra-sun-ultra-moon": Home;
}

export interface DreamWorld {
    front_default: null | string;
    front_female:  null | string;
}

export interface GenerationViii {
    icons: DreamWorld;
}

export interface Other {
    dream_world:        DreamWorld;
    home:               Home;
    "official-artwork": OfficialArtwork;
}

export interface Stat {
    base_stat: number;
    effort:    number;
    stat:      PurpleAbility;
}

export interface Type {
    slot: number;
    type: PurpleAbility;
}
