import { INewPokemon} from "@/interfaces"
import { fixName } from "@/utils";
import { useRouter } from "next/router";
import { FC } from "react"


interface Props{
    pokemon:INewPokemon
}
export const PokemonCard:FC<Props>  = ({pokemon}) => {
    
    const router = useRouter();

    const onPokemonClick = ( ) => {
        router.push(`/name/${name}`);
    }

    const { pokemon_id,name, types, sprites } = pokemon;
    const nameCap = name.charAt(0).toUpperCase() + name.slice(1);
    
  return (
    <div className='pokemon-list--box--wrapper'>
        <div className='pokemon-list--box' onClick={onPokemonClick}>
            <img src={sprites.other?.["official-artwork"].front_default!} className="pokemon-list--box__img" alt="Mewtwo" />
            <span className="pokemon-list--box__no size-16">{String(pokemon_id).padStart(3, "0")}</span>
            <span className="pokemon-list--box__name size-22">{fixName(nameCap)}</span>
            <div className="pokemon-list--box__types">
                {
                    types.map(type=>(
                        <div className={`pokemon-list--box__type ${type.type.name}`} key={type.type.name}>
                            <span>
                                {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}
