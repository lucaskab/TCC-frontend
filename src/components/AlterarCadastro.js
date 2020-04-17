import React, {useState, useEffect} from 'react';
import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text, ImageBackground} from 'react-native';

import { connect } from 'react-redux';
import { Appbar } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import * as Font from 'expo-font';
import api from '../../services/api';
import {modificaAlteraNome, modificaAlteraData, modificaAlteraEndereco,
  modificaAlteraNumero, modificaAlteraCidade, modificaAlteraCEP, modificaAlteraUF, modificaAlteraTelefone,
  modificaAlteraCelular, modificaAlteraRG, modificaAlteraEmail, modificaAlteraSenha} from '../actions/AlteraCadastroActions'


export const AlterarCadastro = (props) =>  {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [Usuario, setUsuario] = useState(null);

    async function AlteraDados() {

      const id = Usuario._id;
      let { nome, dataNascimento, endereco, numero, cidade, cep, uf, telefone, celular, rg } = props    
        var email = props.email1;

      if(nome == ""){
        nome = Usuario.nome;
      }
      if(dataNascimento == ""){
        dataNascimento = Usuario.dataNascimento;
      }
      if(endereco == ""){
        endereco = Usuario.endereco;
      }
      if(numero == ""){
        numero = Usuario.numero;
      }
      if(cidade == ""){
        cidade = Usuario.cidade;
      }
      if(cep == ""){
        cep = Usuario.cep;
      }
      if(uf == ""){
        uf = Usuario.uf;
      }
      if(telefone == ""){
        telefone = Usuario.telefone;
      }
      if(celular == ""){
        celular = Usuario.celular;
      }
      if(rg == ""){
        rg = Usuario.rg;
      }
      if(email == ""){
        email = Usuario.email;
      }

      const resposta = await api.post('/AlteraDadosUsuario',
      { id, nome, dataNascimento, endereco, numero, cidade, cep, uf, telefone, celular, rg, email})

      Actions.navigation();

      
    }

    async function fetchFonts () {
        const retorno = await Font.loadAsync({
          'adventpro-regular': require('../../assets/fonts/adventpro-regular.ttf'),
          'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
          'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf')

          })
        var email = props.email
        const resposta = await api.post('/userscadastrados', {email}) 
        setUsuario(resposta.data);
       setDataLoaded(true);  
      }

    useEffect(() => {
      fetchFonts();
        },[])

    return (
        <>
        {
        dataLoaded ? (
        <>
        
        <Appbar.Header SafeAreaView={0} statusBarHeight={20}>
          <Appbar.BackAction onPress={() => Actions.navigation()}/>
          <Appbar.Content title="Alterar cadastro" />
        </Appbar.Header>
      <ImageBackground style={{ width: '100%', height: '100%'}} source={require('../imgs/telafundo2.jpg')}>
      <ScrollView  style={styles.container}>
     
        <View showsVerticalScrollIndicator={true} style={styles.viewItens}>     
            
            <Text style={styles.alteracaoDePerfil}>Alteração de Perfil</Text>
              
                     <Text style={styles.texts}>Nome:</Text>

                     <TextInput 
                     placeholderTextColor='black' 
                     placeholder= {Usuario.nome} 
                     style={styles.inputs}
                     autoCapitalize="words"
                     autoCorrect={false}
                     value={props.nome}
                     onChangeText={texto => props.modificaAlteraNome(texto)}
                     ></TextInput>
         
                     <Text style={styles.texts}>Data de Nascimento:</Text>
         
                     <TextInput 
                     placeholderTextColor='black' 
                     placeholder= {Usuario.dataNascimento} 
                     style={styles.inputs}
                     autoCapitalize="words"
                     autoCorrect={false}
                     value={props.dataNascimento}
                     onChangeText={texto => props.modificaAlteraData(texto)}
                     ></TextInput>
         
                     <Text style={styles.texts}>Endereço:</Text>
         
                     <TextInput 
                     placeholderTextColor='black' 
                     placeholder= {Usuario.endereco} 
                     style={styles.inputs}
                     autoCapitalize="words"
                     autoCorrect={false}
                     value={props.endereco}
                     onChangeText={texto => props.modificaAlteraEndereco(texto)}
                     ></TextInput>
         
                     <Text style={styles.texts}>Número:</Text>
         
                     <TextInput 
                     placeholderTextColor='black' 
                     placeholder= {Usuario.numero} 
                     style={styles.inputs} 
                     autoCapitalize="words"
                     autoCorrect={false}
                     value={props.numero}
                     onChangeText={texto => props.modificaAlteraNumero(texto)}
                     ></TextInput>
         
                     <Text style={styles.texts}>Cidade:</Text>
         
                     <TextInput 
                     placeholderTextColor='black' 
                     placeholder= {Usuario.cidade} 
                     style={styles.inputs}
                     autoCapitalize="words"
                     autoCorrect={false}
                     value={props.cidade}
                     onChangeText={texto => props.modificaAlteraCidade(texto)}
                     ></TextInput>
         
                     <Text style={styles.texts}>CEP:</Text>
         
                     <TextInput 
                     placeholderTextColor='black'
                     placeholder= {Usuario.cep} 
                     style={styles.inputs}
                     autoCapitalize="words"
                     autoCorrect={false}
                     value={props.cep}
                     onChangeText={texto => props.modificaAlteraCEP(texto)}
                     ></TextInput>
         
                     <Text style={styles.texts}>UF:</Text>
         
                     <TextInput 
                     placeholderTextColor='black' 
                     placeholder= {Usuario.uf} 
                     style={styles.inputs}
                     autoCapitalize="words"
                     autoCorrect={false}
                     value={props.uf}
                     onChangeText={texto => props.modificaAlteraUF(texto)}
                     ></TextInput>
         
                     <Text style={styles.texts}>Telefone:</Text>
         
                     <TextInput 
                     placeholderTextColor='black' 
                     placeholder= {Usuario.telefone} 
                     style={styles.inputs}
                     autoCapitalize="words"
                     autoCorrect={false}
                     value={props.telefone}
                     onChangeText={texto => props.modificaAlteraTelefone(texto)}
                     ></TextInput>
         
                     <Text style={styles.texts}>Celular:</Text>
         
                     <TextInput 
                     placeholderTextColor='black' 
                     placeholder= {Usuario.celular} 
                     style={styles.inputs}
                     autoCapitalize="words"
                     autoCorrect={false}
                     value={props.celular}
                     onChangeText={texto => props.modificaAlteraCelular(texto)}
                     ></TextInput>
         
                     <Text style={styles.texts}>RG:</Text>
         
                     <TextInput 
                     placeholderTextColor='black'
                     placeholder= {Usuario.rg} 
                     style={styles.inputs}
                     autoCapitalize="words"
                     autoCorrect={false}
                     value={props.rg}
                     onChangeText={texto => props.modificaAlteraRG(texto)}
                     ></TextInput>
        
            <TouchableOpacity style={styles.botao} onPress={() => AlteraDados()}>
                <Text style={styles.textbotao}>Alterar</Text>
            </TouchableOpacity> 
        </View> 
    </ScrollView>
    </ImageBackground> 
    </>
    ) : null}
    </>
    )
};

const mapStateToProps = state =>(
    {
      nome: state.AlteraCadastroReducer.nomeAlteraCadastro,
      dataNascimento: state.AlteraCadastroReducer.dataAlteraNascCadastro,
      endereco: state.AlteraCadastroReducer.enderecoAlteraCadastro,
      numero: state.AlteraCadastroReducer.numeroAlteraCadastro,
      cidade: state.AlteraCadastroReducer.cidadeAlteraCadastro,
      cep: state.AlteraCadastroReducer.CEPAlteraCadastro,
      uf: state.AlteraCadastroReducer.UFAlteraCadastro,
      telefone: state.AlteraCadastroReducer.telefoneAlteraCadastro,
      celular: state.AlteraCadastroReducer.celularAlteraCadastro,
      rg: state.AlteraCadastroReducer.RGAlteraCadastro,
      email1: state.AlteraCadastroReducer.emailAlteraCadastro,
    
      email: state.AutenticacaoReducer.emailLogin
    }
    
  )
  
  export default connect(mapStateToProps, {modificaAlteraNome, modificaAlteraData, modificaAlteraEndereco,
    modificaAlteraNumero, modificaAlteraCidade, modificaAlteraCEP, modificaAlteraUF, modificaAlteraTelefone,
    modificaAlteraCelular, modificaAlteraRG, modificaAlteraEmail, modificaAlteraSenha})(AlterarCadastro);

  const styles = StyleSheet.create({
    container: {
        flex:1,   
    },
    viewItens: {
        width: 280,
        alignSelf: 'center'
    },
    alteracaoDePerfil: {
        color: "#121212",
        fontSize: 39,
        fontFamily: 'Roboto-Regular',
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center'
      },
      inputs: {
        width: 245,
        height: 40,
        backgroundColor: "rgba(193,196,239,1)",
        marginTop: 5,
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        paddingHorizontal: 10
      },
      texts: {
        color: "#121212",
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        marginTop: 5,
        marginLeft: 17.5
      },
      textbotao: {
        color: "#121212",
        fontSize: 40,
        fontFamily: 'Roboto-Regular',
      },
      botao: {
        width: 244,
        height: 88,
        marginTop: 20,
        marginBottom: 90,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#673AB7",
        elevation: 2,
        borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
      }
    
  });