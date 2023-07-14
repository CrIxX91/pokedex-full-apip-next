import { FC, ReactNode } from "react";
import Head from "next/head";

interface Props{
    children:ReactNode,
    title?:string,
    padding?:string
}

const origin =(typeof window === 'undefined')?'': window.location.origin;

export const Layout:FC<Props> = ({children,title,padding = '10vw'}) => {

    
  return (
    <>
        <Head>
            <title>{title || 'PokemonApp'}</title>
            <meta name="author" content="Cristian Aguilar"/>
            <meta name="description" content="Informacion sobre el pokemon XXX"/>
            <meta name="keywords" content="XXX,pokemon,pokedex"/>
            <meta property="og:image" content={`${origin}/img/pokedexBanner.webp`}/>
        </Head>

        <main style={{
                padding:`0px ${padding}`
            }}>
            {children}
        </main>
    </>
  )
}