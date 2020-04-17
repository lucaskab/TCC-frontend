const INITIAL_STATE = {
    Foto1: 'a',
    Foto2: 'a',
    Foto3: 'a',
    Foto4: 'a',
    Foto5: 'a',
    Descricao: '',
    Sugestao: '',
    IDEscolhido: '',

}

export default (state = INITIAL_STATE, action) => {
    if(action.type == 'modifica_Foto1'){
        
        return {  ...state, Foto1:action.dadoParaOReducer}
    }

    else if(action.type == 'modifica_Foto2'){
        console.log(state);
        return {  ...state, Foto2:action.dadoParaOReducer}
    }
    else if(action.type == 'modifica_Foto3'){
       
        return {  ...state, Foto3:action.dadoParaOReducer}
    }
    else if(action.type == 'modifica_Foto4'){
       
        return {  ...state, Foto4:action.dadoParaOReducer}
    }
    else if(action.type == 'modifica_Foto5'){
       
        return {  ...state, Foto5:action.dadoParaOReducer}
    }
    else if(action.type == 'modifica_Descricao'){
       
        return {  ...state, Descricao:action.dadoParaOReducer}
    }

    else if(action.type == 'modifica_Sugestao'){
       
        return {  ...state, Sugestao:action.dadoParaOReducer}
    }

    else if(action.type == 'modifica_IDEscolhido'){
       
        return {  ...state, IDEscolhido:action.dadoParaOReducer}
    }
     return state;
}