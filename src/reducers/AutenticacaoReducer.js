const INITIAL_STATE = {
    emailLogin:'',
    senhaLogin:'',
    userID:'',
    userNome: '',
}

export default (state = INITIAL_STATE, action) => {
    if(action.type == 'modifica_email1'){
        return { ...state, emailLogin: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_senha1'){
        return { ...state, senhaLogin: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_userID'){
        return { ...state, userID: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_userNome'){
        return { ...state, userNome: action.dadoParaOReducer}
    }
     return state;
}