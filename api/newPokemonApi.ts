import { INewPokemon } from "@/interfaces";
import supaBaseApi from "./supaBase";

const apiNewPokemon = {
    getAllPokemon: async () => {
        const query = supaBaseApi.getPokemons();
        const { data, error } = await query.order('aux_id',{ ascending: true });
        let PokemonList:INewPokemon[] =[];

        if(data)
            PokemonList = data.map(item=> item as INewPokemon);
        
            return{
            data:PokemonList
        }
    },
}

export default apiNewPokemon;