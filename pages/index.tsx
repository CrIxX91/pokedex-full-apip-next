
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
  
  const fetPokemon =async ()=>{
    
    const responsePokemons = await apiNewPokemon.getAllPokemon();
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    
    const pokemons = await Promise.all(
      data.results.map(async (pkm) => {
        return await getPokemonFullInfo(pkm.name);
    }))


    const fullpokemon =pokemons.flat();

    const resultado = eliminarDuplicados(fullpokemon);
    
    console.log('pokemons',resultado);

    const setNewAbilities =(ability:Ability)=>{
        const {ability:ab}= ability;
        delete ab.url; 
        return ability

    }

    const setNewTypes = (type:Type)=>{
      delete type.type.url;
      return type;
    }

    const setNewStats = (stat:Stat)=>{
        delete stat.stat.url
        return stat
    }
    const NewData = await Promise.all(

      resultado.map(async (pkm,index) =>{

        const auxpkm = pkm as NewPokemon;

        const newAbilities = auxpkm.abilities.map(el=>{
          return setNewAbilities(el)
        })
        const newStats = auxpkm.stats.map(el=>{
          return setNewStats(el)
        })
        const newTypes = auxpkm.types.map(el=>{
          return setNewTypes(el)
        })

        // setNewStats
        const body={
          name: auxpkm.name,
          pokemon_id:auxpkm.id,
          sprites:auxpkm.sprites,
          height:auxpkm.height,
          weight:auxpkm.weight,
          abilities:newAbilities,
          stats:newStats,
          types:newTypes,
          'aux_id':index+1
        }
        
        console.log(body);

        if(!responsePokemons.data?.find(el=> el.name === auxpkm.name)){ 
          return await supaBaseApi.addPokemon({...body});
        }
  }))

  console.log(NewData);
    

    
    
    // const body ={
    //   name:'bulbasaur'
    // }
    // if(!responsePokemons.data?.find(el=> el.name === body.name)){
    //   const resp = await supaBaseApi.addPokemon({...body});
    //   if(resp.data){
    //     console.log('add',resp.data);
    //   }
    // }
  }

  useEffect(() => {
    fetPokemon()
  }, []);
  
  // const pokemonname:string[]=['rattata'];

  // const fecthData = async ()=>{
  //   // const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  //   const pokemons = await Promise.all(
  //     pokemonname.map(async (pkm) => {
  //       return await getPokemonFullInfo(pkm);
  //     })

  //   )

  //   console.log(pokemons);

  //   const pokemonsflat = pokemons.flat();

  //   // const UniqueVariants = VariantsPkm.filter((el)=> !el.name.includes("-totem"))
  //   // const UniqueEvolutions = VariantsPkm.filter((el)=> !el.name.includes("-totem"))
  //   // console.log('UniqueVariants',UniqueVariants);
  //   // console.log('UniqueEvolutions',UniqueEvolutions);
   

  //   const resultado = eliminarDuplicados(pokemonsflat);

  //     console.log(resultado);

  // }
  
  // useEffect(() => {
  //   fecthData()
  // }, [])
  
  
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