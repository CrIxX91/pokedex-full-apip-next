import { INewPokemon } from "@/interfaces";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_API_ENDPOINT!, process.env.NEXT_PUBLIC_API_KEY!);

const supaBaseApi ={

    getPokemons:()=>{
        return supabase
        .from('Pokemon')
        .select('*')
    },
    addPokemon: async (pokemon:any) => {
        const { data, error } = await supabase
            .from('Pokemon')
            .insert(pokemon)
            .select();

        return { data, error };
    },
    getPokemon: async (pokemonname:string) => {
        const { data, error } = await supabase
            .from('Pokemon')
            .select()
            .eq('name', pokemonname);
        let Pokemon;

        if(data){
            Pokemon = data[0] as INewPokemon;
        }
        return { data:Pokemon, error };
    }
}

export default supaBaseApi;