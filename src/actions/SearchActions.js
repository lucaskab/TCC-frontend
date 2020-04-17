export const modificaSearchNome = (texto) => {
  return {
      type: 'modifica_SearchNome',
      dadoParaOReducer: texto
  }
}

export const modificaSearchArea = (texto) => {
  return {
      type: 'modifica_SearchArea',
      dadoParaOReducer: texto
  }
}
export const modificaSearchKM = (texto) => {
  return {
      type: 'modifica_SearchKM',
      dadoParaOReducer: texto
  }
}