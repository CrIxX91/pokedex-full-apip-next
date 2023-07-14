import { Pokemon } from "@/interfaces"
import { FC } from "react"


interface Props{
    pokemon:Pokemon
}
export const PokemonCard:FC<Props>  = ({pokemon}) => {
    const { id,name, types, sprites, evolutions } = pokemon;
  return (
    <div className='pokemon-list--box--wrapper'>
        <div className='pokemon-list--box'>
            <img src={sprites.other?.["official-artwork"].front_default!} className="pokemon-list--box__img" alt="Mewtwo" />
            <span className="pokemon-list--box__no size-16">{String(id).padStart(3, "0")}</span>
            <span className="pokemon-list--box__name size-22">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
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
            {/* <div className="pokemon-list--box__types">
                {
                    evolutions.map(evolution=>(
                        <div className={`pokemon-list--box__type `} key={evolution.name}>
                            <small style={{color:'white'}}>
                                {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}
                            </small>
                        </div>
                    ))
                }
            </div> */}
        </div>
    </div>
  )
}
