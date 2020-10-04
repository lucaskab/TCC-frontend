import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import api from '../../services/api';
import { TextInput } from 'react-native-paper';
import DATA from '../data/data';
import { connect } from 'react-redux';
import { Appbar, RadioButton } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

const ServiceProviderAdd = (props) => {
  const [nameProblem, setNameProblem] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    const email = props.email;
    const senha = props.senha;
    api.post('userscadastrados', {email,senha}).then(response => {
      setUser(response.data)
    })} , []);

  function newProblem() {
    if(nameProblem != ''){
      switch(user.prestador){
        case "Acessibilidade":
          DATA.Acessibilidade.push(nameProblem);
          break;
        case "Animais":
          DATA.Animais.push(nameProblem);
          break;
        case "Assistência Social":
          DATA.Assistência_Social.push(nameProblem);
          break;
        case"Comércio e Serviço":
        DATA.Comércio_e_Serviço.push(nameProblem);
          break;
        case"Conservação Urbana":
        DATA.Conservação_Urbana.push(nameProblem);
          break;
        case "Cultura, Lazer e Turismo":
          DATA.Cultura_Lazer_Turismo.push(nameProblem);
          break;
        case "Defesa Civil":
          DATA.Defesa_Civil.push(nameProblem);
          break;
        case "Documentos e Processos":
          DATA.Documentos_Processos.push(nameProblem);
          break;
        case "Educação":
          DATA.Educação.push(nameProblem);
          break;
        case"Limpeza Urbana":
        DATA.Limpeza_Urbana.push(nameProblem);
          break;
        case"Meio Ambiente":
        DATA.Meio_Ambiente.push(nameProblem);
          break;
        case"Obras, Estruturas e Imóveis":
        DATA.Obras_Estruturas_Imóveis.push(nameProblem);
          break;
        case"Ordem Pública":
        DATA.Ordem_Pública.push(nameProblem);
          break;
        case"Saúde e Vigilancia Sanitária":
        DATA.Saúde_Vigilancia_Sanitária.push(nameProblem);
          break;
        case"Serviços Funerários":
        DATA.Serviços_Funerários.push(nameProblem);
          break;
        case"Trânsito":
        DATA.Trânsito.push(nameProblem);
          break;
        case"Transporte":
        DATA.Transporte.push(nameProblem);
          break; 
      }
      Alert.alert("Sucesso","Novo problema cadastrado com sucesso!!");
    }
    else {
      Alert.alert("Erro","Nome de problema inválido");
    }  
    return;
  }

  return (
    <>
    <Appbar.Header SafeAreaView={0} statusBarHeight={30} style={{backgroundColor: '#8a2be2'}}>
      <Appbar.Action icon="account-edit" onPress={() => Actions.alterarCadastro()}/> 
        <Appbar.Content title="" />
        <Appbar.Action icon="logout" onPress={() => Actions.formLogin()}/>
    </Appbar.Header>

    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'white'}}>
      <Text style={{fontSize: 28, color: '#8a2be2', fontWeight: 'bold', marginBottom: 50, textAlign: 'center'}}>Insira abaixo o nome de um novo problema</Text>
      <TextInput
        placeholder="Ex: Animal Abandonado" 
        style={{width: 250, height: 50, marginBottom: 50, borderWidth: 4, borderColor: '#8a2be2'}} 
        onChangeText={(value) => {setNameProblem(value);}}>
      </TextInput>
      <Button style={{width: 300, height: 50, marginBottom: 50}} color='#8a2be2' title="Clique Aqui" onPress={() => {newProblem()}}></Button>
    </View>
    </>
  )
}

 const mapStateToProps = state =>(
  {
    email: state.AutenticacaoReducer.emailLogin,
    senha: state.AutenticacaoReducer.senhaLogin,
  }
);


export default connect(mapStateToProps)(ServiceProviderAdd);