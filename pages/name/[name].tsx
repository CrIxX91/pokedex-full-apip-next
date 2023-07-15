import { apiNewPokemon, supaBaseApi } from "@/api";
import { Layout } from "@/components/layout";
import { INewPokemon } from "@/interfaces";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
// import variables from '../../sass/variables.module.scss';
// import styles from '/sass/pokemondetail.module.scss';
import styles from '../../sass/pokemondetail.module.scss'


interface Props {
    pokemon: INewPokemon;
}


const PokemonPageName:NextPage<Props>= ({pokemon}) => {

    return(
        <Layout title={pokemon.name} padding='0px'>
            <div className={styles.pokemon_detail_contents}>
                <div className={styles.pokemon_detail}>
                    <div className={styles.pokemon_detail__header}>
                        <span>Pokédex</span>
                    {/* <h1 style={{ color: variables.primaryColor }}>Hello, Next.js!</h1> */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    
    const responsePokemons= await apiNewPokemon.getAllPokemon();
    const pokemonnames: string[] = responsePokemons.data.map(pokemon=>pokemon.name);
  
    return {
      paths: pokemonnames.map( name => ({
        params: { name },
      })),
      fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };
    const {data:pokemon} = await supaBaseApi.getPokemon(name);
    console.log('prop',pokemon)
    
    return {
      props: {
        pokemon
      },
    };
  };

export default PokemonPageName