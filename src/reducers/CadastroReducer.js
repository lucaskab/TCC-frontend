const INITIAL_STATE = {
    nomeCadastro:'',
    dataNascCadastro:'',
    enderecoCadastro: '',
    numeroCadastro: '',
    cidadeCadastro: '',
    CEPCadastro:'',
    UFCadastro:'',
    telefoneCadastro:'',
    celularCadastro: '',
    RGCadastro:'',
    emailCadastro:'',
    confEmailCadastro:'',
    senhaCadastro:'',
    prestador: '',
    senhaPrestador: '',
}

export default (state = INITIAL_STATE, action) => {
    if(action.type == 'modifica_nome'){
        return { ...state, nomeCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_prestador'){
        return { ...state, prestador: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_senhaPrestador'){
        return { ...state, senhaPrestador: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_data'){
        return { ...state, dataNascCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_endereco'){
        return { ...state, enderecoCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_numero'){
        return { ...state, numeroCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_cidade'){
        return { ...state, cidadeCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_CEP'){
        return { ...state, CEPCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_UF'){
        return { ...state, UFCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_telefone'){
        return { ...state, telefoneCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_celular'){
        return { ...state, celularCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_RG'){
        return { ...state, RGCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_email'){
        return { ...state, emailCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_confEmail'){
        return { ...state, confEmailCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_senha'){
        return { ...state, senhaCadastro: action.dadoParaOReducer}
    }

     return state;
}