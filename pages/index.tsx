import { apiNewPokemon, pokeApi } from '@/api'
import { Layout } from '@/components/layout'
import { PokemonCard } from '@/components/pokemon/PokemonCard'
import { INewPokemon } from '@/interfaces'
import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'
interface Props{
  pokemons:INewPokemon[]
}

const HomePage:NextPage<Props> = ({pokemons}) => {
 
  const fetchPokeData = async ()=>{
    const responsePokemons= await apiNewPokemon.getAllPokemon();
    console.log(responsePokemons);
  }
  useEffect(() => {
    fetchPokeData()
  }, [])
  
  return (
    <div className='pokemon-list-contents'>
      <Layout >
        
          <div className='pokemon-list'>
            {
              pokemons.map(pkm=>(
                <PokemonCard pokemon={pkm} key={pkm.name}/>
                // <h1 key={pkm.name}>{pkm.name}</h1>
              ))
            }
          </div>
        
      </Layout>
      </div>  
    )
}

export const getStaticProps:GetStaticProps =async (ctx) => {

  const responsePokemons= await apiNewPokemon.getAllPokemon();
  const pokemons = responsePokemons.data;

  return{
    props:{
      pokemons
    }
  }
}
export default HomePage;