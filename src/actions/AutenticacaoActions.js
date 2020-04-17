export const modificaEmail1 = (texto) => {
    return {
        type: 'modifica_email1',
        dadoParaOReducer: texto
    }
}

export const modificaSenha1 = (texto) => {
    return {
        type: 'modifica_senha1',
        dadoParaOReducer: texto
    }
}

export const modificaUserID = (texto) => {
        return {
        type: 'modifica_userID',
        dadoParaOReducer: texto
    }
}

export const modificaUserNome = (texto) => {
    return {
        type: 'modifica_userNome',
        dadoParaOReducer: texto
    }
}