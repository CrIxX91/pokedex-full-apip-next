export const fixName = (name:string) => {
    const basename = name.split('-')[0];

    if(name.includes('-mega')){
        return `Mega ${basename} `
    }else if(name.includes('-gmax')){
        return `${basename} Gigantamax`
    }
    return name
}