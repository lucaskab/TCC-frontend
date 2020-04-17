export const modificaCamURI = (texto) => {
    return {
        type: 'modifica_camURI',
        dadoParaOReducer: texto
    }
}

export const modificaPhotoURI = (texto) => {
    return {
        type: 'modifica_photoURI',
        dadoParaOReducer: texto
    }
}