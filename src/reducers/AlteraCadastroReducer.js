const INITIAL_STATE = {
    nomeAlteraCadastro:'',
    dataAlteraNascCadastro:'',
    enderecoAlteraCadastro: '',
    numeroAlteraCadastro: '',
    cidadeAlteraCadastro: '',
    CEPAlteraCadastro:'',
    UFAlteraCadastro:'',
    telefoneAlteraCadastro:'',
    celularAlteraCadastro: '',
    RGAlteraCadastro:'',
    emailAlteraCadastro:'',
    senhaAlteraCadastro:''
}

export default (state = INITIAL_STATE, action) => {
    if(action.type == 'modifica_Alteranome'){
        return { ...state, nomeAlteraCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_Alteradata'){
        return { ...state, dataAlteraNascCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_Alteraendereco'){
        return { ...state, enderecoAlteraCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_Alteranumero'){
        return { ...state, numeroAlteraCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_Alteracidade'){
        return { ...state, cidadeAlteraCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_AlteraCEP'){
        return { ...state, CEPAlteraCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_AlteraUF'){
        return { ...state, UFAlteraCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_Alteratelefone'){
        return { ...state, telefoneAlteraCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_Alteracelular'){
        return { ...state, celularAlteraCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_AlteraRG'){
        return { ...state, RGAlteraCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_Alteraemail'){
        return { ...state, emailAlteraCadastro: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_Alterasenha'){
        return { ...state, senhaAlteraCadastro: action.dadoParaOReducer}
    }

     return state;
}