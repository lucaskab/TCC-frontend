import React, { Component, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, ScrollView,TextInput } from "react-native";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail1, modificaSenha1, modificaUserID, modificaUserNome } from '../actions/AutenticacaoActions';
import api from '../../services/api';




const formLogin = props=>{

  async function logar(email, senha) {
  
    var msg = {email, senha};
    const resposta = await api.post('/userscadastrados', msg);
    props.modificaUserID(resposta.data._id)
    props.modificaUserNome(resposta.data.nome);
    if(resposta.data === null){
      alert("Usuário não encontrado");
    }
    else {
      if(resposta.data.prestador){
        Actions.tab();
      }
      else Actions.navigation();
    }
  }

  useEffect(() => {
    props.modificaEmail1("");
    props.modificaSenha1("");
  },[])

  return (
      <ImageBackground style={{ width: '100%', height: '100%'}} source={require('../imgs/telafundo2.jpg')}>
       <ScrollView>
      <View style = {styles.PosicaoTudo}> 
          <View>
              <Text style = {styles.titulo}>Reporte Já</Text>
          </View>
          <View style={styles.container}>
          <View style={styles.SectionStyle}>
          <Image source={require('../imgs/iconuser.png')} style={styles.ImageStyle} />
          <TextInput
              style={{width: 345, marginLeft: 10, fontSize: 20,}}
              placeholder="Email"
              placeholderTextColor ='black'
              value={props.email}
              onChangeText={texto => props.modificaEmail1(texto)}
          />
          </View>
          <View style={styles.SectionStyle}>
          <Image source={require('../imgs/passwordicon.png')} style={styles.ImageStyle} />
          <TextInput
              style={{marginLeft: 10, fontSize: 20, width: 345}}
              placeholder="Senha"
              secureTextEntry={true}
              placeholderTextColor = 'black'
              value={props.senha}
              onChangeText={texto => props.modificaSenha1(texto)}
          />
          </View>
              <Text style = {styles.text} >Ainda não tem cadastro?</Text> 
              <View>
              <TouchableOpacity  
              onPress={() => Actions.formCadastro()}
              >
                <Text style = {styles.text1} >Cadastre-se</Text> 
                </TouchableOpacity>
              </View>
          </View>
          <View style={{alignItems: 'center'}}>
              <TouchableOpacity  
              onPress={() => logar(props.email, props.senha)}
              style={styles.SectionStyle} 
              >
              <Text style={styles.text2}> Acessar </Text>
              </TouchableOpacity>

          </View>
          </View>
          </ScrollView>   

      </ImageBackground>

    
  ) }

  const mapStateToProps = state =>(
    {
      email: state.AutenticacaoReducer.emailLogin,
      senha: state.AutenticacaoReducer.senhaLogin,
      email: state.AutenticacaoReducer.emailLogin,
    }
  )

  export default connect(mapStateToProps, {modificaEmail1, modificaSenha1, modificaUserID, modificaUserNome})(formLogin);

  const styles = StyleSheet.create({
    text: {
      fontSize: 25,
      alignItems: 'center'

    },
    text1: {
      fontSize: 25,
      alignItems: 'center',
      color: 'blue',
      marginBottom: 15

    },
    text2: {
      fontSize: 30,
      color: 'black',
      alignItems: 'center',
      marginLeft: 85,
      marginTop: 5
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
      },
      SectionStyle: {
        width: 285,
        height: 54,
        backgroundColor: "white",
        borderRadius: 100,
        flexDirection: "row",
        textAlign:'center',
        marginBottom: 30,
        color: "#333333",
        
    },
      ImageStyle: {
        marginTop: 12,
        marginLeft: 12,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode : 'stretch',
        alignItems: 'center'
    },
      titulo:{
        color: "#121212",
        fontSize: 40,
        marginBottom: 30,
        marginTop: 30 
 },
      botaoFace: {
        width: 74,
        height: 66,
        backgroundColor: "rgba(254,254,254,1)",
        borderRadius: 100,
        marginRight: 20
      },
      botaoGoogle: {
        width: 74,
        height: 66,
        backgroundColor: "rgba(254,254,254,1)",
        borderRadius: 100,
        marginLeft: 20,
        marginBottom: 40
      },
      posicaoBotoesP: {
          flexDirection: 'row',
          marginTop: 20
      },
      PosicaoTudo1: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      PosicaoTudo: {
       alignItems: 'center',
       justifyContent: 'center',
       margin: 30,

    }
  })