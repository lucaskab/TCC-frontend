const INITIAL_STATE = {
    camURI:'',
    photoURI:''

}

export default (state = INITIAL_STATE, action) => {
    if(action.type == 'modifica_camURI'){
        return { ...state, camURI: action.dadoParaOReducer}
    }
    if(action.type == 'modifica_photoURI'){
        return { ...state, photoURI: action.dadoParaOReducer}
    }
     return state;
}