
import { apiNewPokemon, pokeApi, supaBaseApi } from '@/api'
import { Layout } from '@/components/layout'
import { PokemonCard } from '@/components/pokemon/PokemonCard'
import { Ability, Pokemon, PokemonListResponse, Species, Stat, Type } from '@/interfaces'
import { NewPokemon } from '@/interfaces/new-pokemon'
import { eliminarDuplicados, getPokemonFullInfo } from '@/utils'
import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
interface Props{
  pokemons:Pokemon[]
}

const HomePage:NextPage<Props> = ({pokemons}) => {
  
  return (
    <div className='pokemon-list-contents'>
      <Layout >
        
          <div className='pokemon-list'>
            {
              pokemons.map(pkm=>(<PokemonCard pokemon={pkm} key={pkm.name}/>))
            }
          </div>
        
      </Layout>
      </div>  
    )
}

export const getStaticProps:GetStaticProps =async (ctx) => {


  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons = await Promise.all(
    data.results.map(async (pkm) => {
      return await getPokemonFullInfo(pkm.name);
    })
  )

  const fullpokemon = pokemons.flat();
  const resultado = eliminarDuplicados(fullpokemon);

  return{
    props:{
      pokemons:resultado
    }
  }
}
export default HomePage;