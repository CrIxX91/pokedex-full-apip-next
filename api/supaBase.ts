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
    }
}

export default supaBaseApi;