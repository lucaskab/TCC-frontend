import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import Navigation from './components/Navigation';
import FormCadastroProblema from './components/FormCadastroProblema';
import EnviarProblema from './components/EnviarProblema';
import AlterarCadastro from './components/AlterarCadastro';
import Perfil from './components/Perfil';
import Buscas from './components/Buscas';
import Foto from './components/Foto';
import ProblemInfo from './components/ProblemInfo';
import Tab from './components/MyTabs';
import FullPicture from './components/FullPicture';


export default props => (
    <>
    <Router showNavigationBar={false}>
        <Stack key="root">
        <Scene key='formLogin' component={FormLogin} hideNavBar/>
        <Scene key='tab' component={Tab} hideNavBar />
        <Scene key='perfil' component={Perfil} hideNavBar/>
        <Scene key='fotos' component={Foto} hideNavBar/>
        <Scene key='busca' component={Buscas} /> 
        <Scene key='alterarCadastro' component={AlterarCadastro} hideNavBar/>
        <Scene key='enviarProblema' component={EnviarProblema} hideNavBar/>  
        <Scene key='formCadastroProblema' component={FormCadastroProblema} hideNavBar />
        <Scene key='navigation' component={Navigation} hideNavBar /> 
        <Scene key='formCadastro' component={FormCadastro} hideNavBar/>
        <Stack key='problemInfo' component={ProblemInfo} hideNavBar />
        <Scene key='fullPicture' component={FullPicture} hideNavBar/>

        </Stack>
    </Router>  
    </>
)