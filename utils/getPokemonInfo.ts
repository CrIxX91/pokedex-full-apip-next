import { pokeApi } from "@/api";
import { PokemonSpecie, Pokemon, Variety } from "@/interfaces";
import { IEvolution } from "@/interfaces";

export interface EvolutionProp{
    name:string;
    url:string;
}
export const getPokemonInfo = async(nameOrId:string) => {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
    
    
    const { name, sprites, types, id, height, weight, abilities, stats } = data;

    const {Evoluciones,variantes,textDesc, habitadname,namejap} = await getevolution(name);

    return { 
        name, 
        sprites, 
        types, 
        id, 
        height, 
        weight, 
        abilities, 
        stats,
        evolutions:Evoluciones,
        variantes,
        description:textDesc,
        habitat:habitadname,
        namejap
    };
}

const getevolution = async (name:string)=>{
    const species = await pokeApi.get(`/pokemon-species/${name}`);
    const url = species.data.evolution_chain.url.split('v2')[1];
    const {flavor_text_entries,habitat,names}:PokemonSpecie = species.data;
    let namejap = '';

    const habitadname = habitat.name;
    const description = flavor_text_entries.find((txt)=> txt.language.name ==='en');
    let textDesc = '';
    const Evoluciones:EvolutionProp[] =[];

    if(names){
        const japname = names.find(lang=> lang.language.name ==="ja-Hrkt" );
        if(japname)
            namejap = japname.name;
    }
    
    if(description){
        textDesc = description.flavor_text.replace(/\\|\n|\f/g, ' ');
    }
    
    let variantes: Variety[] =[];

    await pokeApi.get(url).then(async responseEvolution => {
      
        const {chain}:IEvolution = responseEvolution.data;
        
        
        if(chain.species){
            Evoluciones.push({name:chain.species.name, url:chain.species.url})
        }
            // evolutions.push(chain.species.name);

        if(chain.evolves_to.length !== 0){
            const pkm2 = chain.evolves_to[0].species;
            Evoluciones.push({name:pkm2.name, url:pkm2.url})

            if(chain.evolves_to[0].evolves_to.length !== 0){
                const pkm3 = chain.evolves_to[0].evolves_to[0].species;
                Evoluciones.push({name:pkm3.name, url:pkm3.url})
            }
        }


        if(Evoluciones){
            const lastPkm = Evoluciones[Evoluciones.length-1];

            const url = lastPkm.url.split('v2')[1];
                await pokeApi.get(url).then((response)=>{
                        const VarEvolution:PokemonSpecie = response.data;
                        variantes = VarEvolution.varieties.filter((spec)=> !spec.is_default);
                        if(variantes){
                            variantes.map((varaux)=>{
                                Evoluciones.push({name:varaux.pokemon.name, url:varaux.pokemon.url})
                            })
                        }
                    }
                );
        }
        // console.log(variantes)
    });



    return {Evoluciones,variantes,textDesc,habitadname,namejap}
  }