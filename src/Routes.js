import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import FormPrincipal from './components/FormPrincipal';
import Navigation from './components/Navigation';
import FormCadastroProblema from './components/FormCadastroProblema';
import EnviarProblema from './components/EnviarProblema';
import AlterarCadastro from './components/AlterarCadastro';
import Tutorial from './components/Tutorial';
import Perfil from './components/Perfil';
import Buscas from './components/Buscas';
import Foto from './components/Foto';
import CompleteProblem from './components/CompleteProblem';
import ProblemRemoteLocation from './components/ProblemRemoteLocation';


export default props => (
    <>
    <Router showNavigationBar={false}>
        <Stack key="root">
        <Scene key='formLogin' component={FormLogin} hideNavBar/>
        <Scene key='problemRemoteLocation' component={ProblemRemoteLocation} hideNavBar/>
        <Scene key='perfil' component={Perfil} hideNavBar/>
        <Scene key='fotos' component={Foto} hideNavBar/>
        <Scene key='busca' component={Buscas} />
        <Scene key='tutorial' component={Tutorial} hideNavBar/> 
        <Scene key='alterarCadastro' component={AlterarCadastro} hideNavBar/>
        <Scene key='enviarProblema' component={EnviarProblema} hideNavBar/>  
        <Scene key='formCadastroProblema' component={FormCadastroProblema} hideNavBar />
        <Scene key='navigation' component={Navigation} hideNavBar /> 
        <Scene key='formCadastro' component={FormCadastro} hideNavBar/>
        <Scene key='formPrincipal' component={FormPrincipal} hideNavBar />
        <Scene key='completeProblem' component={CompleteProblem} hideNavBar />

        </Stack>
    </Router>  
    </>
)