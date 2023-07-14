import supaBaseApi from "./supaBase";

const apiNewPokemon = {
    getAllPokemon: async () => {
        const query = supaBaseApi.getPokemons();
        const { data, error } = await query.order('id',{ ascending: true });

        if(data)
            console.log(data);
        return{
            data
        }
    },
}

export default apiNewPokemon;