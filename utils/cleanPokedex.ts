export const eliminarDuplicados = (arr: object[]) => {
    const unicos: object[] = [];
  
    arr.forEach(objeto => {
      if (!unicos.some(item => JSON.stringify(item) === JSON.stringify(objeto))) {
        unicos.push(objeto);
      }
    });
  
    return unicos;
  };