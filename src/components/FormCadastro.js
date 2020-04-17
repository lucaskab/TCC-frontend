import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import { Actions } from "react-native-router-flux";
import { TextInputMask } from 'react-native-masked-text';
import { connect } from 'react-redux';
import {
  modificaNome, modificaData, modificaEndereco, modificaNumero, modificaCidade, modificaCEP,
  modificaUF, modificaTelefone, modificaCelular, modificaRG, modificaEmail, modificaConfEmail, modificaSenha
} from '../actions/CadastroActions';


import { Appbar } from 'react-native-paper';

import api from '../../services/api';



async function cadastrar(nome, dataNascimento, endereco, numero, cidade, cep, uf, telefone, celular,
  rg, email1,confEmail, senha1) {
    var email = email1;
    var senha = senha1;
    if(email === confEmail){
        const resposta = await api.post('/users', {nome, dataNascimento, endereco, numero, cidade, cep, uf, telefone, celular,
          rg, email, senha});
    }
  Actions.formLogin();
  
};


const formCadastro = props => {
  return (
    <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../imgs/telafundo2.jpg')}>
        
        <Appbar.Header SafeAreaView={0} statusBarHeight={20}>
          <Appbar.BackAction onPress={() => Actions.formLogin()}/>
          <Appbar.Content title="Cadastro" />
        </Appbar.Header>
        
     <KeyboardAvoidingView behavior="padding" style={styles.PosicaoTudo} keyboardVerticalOffset= '30' >
      <ScrollView>
          <View style={styles.container}>
            <View style={styles.SectionStyle}>
              <TextInput
                style={{ width: 345, marginLeft: 10, fontSize: 20, }}
                placeholder="Nome Completo"
                placeholderTextColor='black'
                value={props.nome}
                onChangeText={texto => props.modificaNome(texto)}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInputMask
                style={{ width: 345, marginLeft: 10, fontSize: 20, }}
                placeholder="Data de Nascimento"
                placeholderTextColor='black'
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY'
                }}
                value={props.dataNasc}
                onChangeText={texto => props.modificaData(texto)}

              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={{ marginLeft: 10, fontSize: 20, width: 345 }}
                placeholder="Endereço"
                placeholderTextColor='black'
                value={props.endereco}
                onChangeText={texto => props.modificaEndereco(texto)}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInputMask
                style={{ marginLeft: 10, fontSize: 20, width: 345 }}
                placeholder="Número"
                placeholderTextColor='black'
                type={'custom'}
                options={{
                  mask: 'SSSSSSSSSSSSSSSSSSSSSSSSSS'
                }}
                value={props.numero}
                onChangeText={texto => props.modificaNumero(texto)}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={{ marginLeft: 10, fontSize: 20, width: 345 }}
                placeholder="Cidade"
                placeholderTextColor='black'
                value={props.cidade}
                onChangeText={texto => props.modificaCidade(texto)}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.SectionStyleCep}>
                <TextInputMask
                  style={{ marginLeft: 10, fontSize: 20, width: 120 }}
                  placeholder="CEP"
                  placeholderTextColor='black'
                  type={'zip-code'}
                  value={props.CEP}
                  onChangeText={texto => props.modificaCEP(texto)}
                />
              </View>

              <View style={styles.SectionStyleUF}>
                <TextInputMask
                  style={{ marginLeft: 10, fontSize: 20, width: 70 }}
                  placeholder="UF"
                  placeholderTextColor='black'
                  type={'custom'}
                  options={{
                    mask: 'AA'
                  }}
                  value={props.UF}
                  onChangeText={texto => props.modificaUF(texto)}
                />
              </View>
            </View>

            <View style={styles.SectionStyle}>
              <TextInputMask
                style={{ marginLeft: 10, fontSize: 20, width: 345 }}
                placeholder="Telefone"
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                value={props.telefone}
                onChangeText={texto => props.modificaTelefone(texto)}

                placeholderTextColor='black'
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInputMask
                style={{ marginLeft: 10, fontSize: 20, width: 345 }}
                placeholder="Celular"
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                value={props.celular}
                onChangeText={texto => props.modificaCelular(texto)}
                placeholderTextColor='black'
              />
            </View>


            <View style={styles.SectionStyle}>
              <TextInputMask
                style={{ marginLeft: 10, fontSize: 20, width: 345 }}
                placeholder="RG"
                placeholderTextColor='black'
                type={'custom'}
                options={{
                  mask: 'SS.SSS.SSS-S'
                }}
                value={props.RG}
                onChangeText={texto => props.modificaRG(texto)}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={{ marginLeft: 10, fontSize: 20, width: 345 }}
                placeholder="Email"
                placeholderTextColor='black'
                value={props.email1}
                onChangeText={texto => props.modificaEmail(texto)}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={{ marginLeft: 10, fontSize: 20, width: 345 }}
                placeholder="Confirmação Email"
                placeholderTextColor='black'
                value={props.confEmail}
                onChangeText={texto => props.modificaConfEmail(texto)}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={{ marginLeft: 10, fontSize: 20, width: 345 }}
                placeholder="Senha"
                secureTextEntry={true}
                placeholderTextColor='black'
                value={props.senha1}
                onChangeText={texto => props.modificaSenha(texto)}
              />
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => cadastrar(props.nome, props.dataNasc, props.endereco, props.numero, props.cidade,
                                        props.CEP, props.UF, props.telefone, props.celular, props.RG, props.email1,
                                        props.confEmail, props.senha1)}
              style={styles.SectionStyle}
            >
              <Text style={styles.text2}> Registrar </Text>
            </TouchableOpacity>

          </View>
          
      </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>


  )
}
const mapStateToProps = state => (
  {
    nome: state.CadastroReducer.nomeCadastro,
    dataNasc: state.CadastroReducer.dataNascCadastro,
    endereco: state.CadastroReducer.enderecoCadastro,
    numero: state.CadastroReducer.numeroCadastro,
    cidade: state.CadastroReducer.cidadeCadastro,
    CEP: state.CadastroReducer.CEPCadastro,
    UF: state.CadastroReducer.UFCadastro,
    telefone: state.CadastroReducer.telefoneCadastro,
    celular: state.CadastroReducer.celularCadastro,
    RG: state.CadastroReducer.RGCadastro,
    email1: state.CadastroReducer.emailCadastro,
    confEmail: state.CadastroReducer.confEmailCadastro,
    senha1: state.CadastroReducer.senhaCadastro,
  }
)
export default connect(mapStateToProps, {
  modificaNome, modificaData, modificaEndereco, modificaNumero, modificaCidade, modificaCEP,
  modificaUF, modificaTelefone, modificaCelular, modificaRG, modificaEmail, modificaConfEmail, modificaSenha
})(formCadastro);

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
    margin: 10,
    marginTop: 25
  },
  SectionStyle: {
    width: 285,
    height: 54,
    backgroundColor: "white",
    borderRadius: 100,
    flexDirection: "row",
    textAlign: 'center',
    marginBottom: 30,
    color: "#333333",

  },
  SectionStyleCep: {
    width: 135,
    height: 54,
    backgroundColor: "white",
    borderRadius: 100,
    flexDirection: "row",
    textAlign: 'center',
    marginBottom: 30,
    marginRight: 65,
    color: "#333333",

   
  },
  SectionStyleUF: {
    width: 80,
    height: 54,
    backgroundColor: "white",
    borderRadius: 100,
    flexDirection: "row",
    textAlign: 'center',
    marginBottom: 30,
    color: "#333333"

    
  },
  ImageStyle: {
    marginTop: 12,
    marginLeft: 12,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  titulo: {
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
    justifyContent: 'center'
  },
  PosicaoTudo: {
    alignItems: 'center'

  }
}
)
