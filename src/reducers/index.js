import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import CadastroReducer from './CadastroReducer';
import CameraReducer from './CameraReducer';
import ProblemaReducer from './ProblemaReducer';
import AlteraCadastroReducer from './AlteraCadastroReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
    AutenticacaoReducer: AutenticacaoReducer,
    CadastroReducer: CadastroReducer,
    CameraReducer: CameraReducer,
    ProblemaReducer: ProblemaReducer,
    AlteraCadastroReducer: AlteraCadastroReducer,
    SearchReducer: SearchReducer
});