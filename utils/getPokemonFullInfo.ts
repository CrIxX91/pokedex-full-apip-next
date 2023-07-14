import { pokeApi } from "@/api";
import { IEvolution, Pokemon, PokemonSpecie } from "@/interfaces";
import { NewPokemon } from "@/interfaces/new-pokemon";

let evolutionchain = '';

export const getPokemonFullInfo = async(nameOrId:string) => {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    const PKM = getCleanPokemon( data);
    const {VariantsPkm,Evolutions} = await getEvolutionAndVariant(PKM.name);
    const uniqueEvolution = Evolutions.flat().filter(el=> !el.name.includes("-totem"));
    const uniqueVariants = VariantsPkm.flat().filter(el=> !el.name.includes("-totem"));

    evolutionchain = '';
    return [PKM,...uniqueVariants, ...uniqueEvolution].flat();
}

const getCleanPokemon = (pkm:Pokemon) => {

    const { name, sprites, types, id, height, weight, abilities, stats } = pkm;
    const pokemon: NewPokemon = {
        name, 
        sprites, 
        types, 
        id, 
        height, 
        weight, 
        abilities, 
        stats
    }
    return pokemon;
}

const getEvolutionAndVariant = async (nameOrId:string)=> {
    const species = await pokeApi.get(`/pokemon-species/${nameOrId}`);
    const url = species.data.evolution_chain.url.split('v2')[1];

    let Evolutions:NewPokemon[][] = [];
    let VariantsPkm:NewPokemon[]  =[];

    if(evolutionchain === url){
        return {VariantsPkm, Evolutions}
    }

    evolutionchain = url;
    const {flavor_text_entries,habitat,names,varieties}:PokemonSpecie = species.data;
    const variants = varieties.filter(auxvar=> !auxvar.is_default);

    VariantsPkm = await Promise.all(
        variants.map(async (pkm) => {
            const varurl = pkm.pokemon.url.split('v2')[1];
            return await getVariantEvolutionInfo(varurl)
          }))

   

    await pokeApi.get(url).then(async responseEvolution => {
        
        const {chain}:IEvolution = responseEvolution.data;

        if(chain.evolves_to){

            let lastEvo:NewPokemon[][] = [];
            Evolutions = await Promise.all(
                chain.evolves_to.map(async (pkm) => {
                    const url = pkm.species.url.split('v2')[1];
                    
                    
                    if (pkm.evolves_to.length !== 0) {

                        lastEvo = await Promise.all(pkm.evolves_to.map(async (final) => {
                            const urlfinal = final.species.url.split('v2')[1];
                            const lastpkm = await getSpecieInfo(urlfinal);
                            
                            return lastpkm

                        })
                        );
                    }
                    return await getSpecieInfo(url);
                })
            );
            Evolutions = Evolutions.concat(lastEvo);
            
        }
    })

        
    return {VariantsPkm, Evolutions}
}

const getSpecieInfo = async (nameOrId:string)=> {
    const { data } = await pokeApi.get<PokemonSpecie>(`${nameOrId}`);
    
    const VariantsPkm = await Promise.all(
        data.varieties.map(async (pkm) => {
            const varurl = pkm.pokemon.url.split('v2')[1];
            return await getVariantEvolutionInfo(varurl)
          }))
    return VariantsPkm
}

export const getPokemon = async(nameOrId:string) => {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
    const PKM = getCleanPokemon( data);
    return PKM
}
const getVariantEvolutionInfo = async (nameOrId:string)=> {
    const { data } = await pokeApi.get<Pokemon>(`${nameOrId}`);

    const PKM = getCleanPokemon( data);
    return PKM
}