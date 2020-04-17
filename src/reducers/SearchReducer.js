const INITIAL_STATE = {
  SearchNome: '',
  SearchArea: '',
  SearchKM: ''

}

export default (state = INITIAL_STATE, action) => {
  if(action.type == 'modifica_SearchNome'){
      
      return {  ...state, SearchNome:action.dadoParaOReducer}
  }

  else if(action.type == 'modifica_SearchArea'){
    
      return {  ...state, SearchArea:action.dadoParaOReducer}
  }
  else if(action.type == 'modifica_SearchKM'){
     
      return {  ...state, SearchKM:action.dadoParaOReducer}
  }

   return state;
}