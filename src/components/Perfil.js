import React, {useEffect, useState} from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import Constants from 'expo-constants'
import Logo from '../assets/logo1.png';
import {Actions} from "react-native-router-flux";
import { Feather } from '@expo/vector-icons'
import { connect } from 'react-redux';
import api from '../../services/api';
import CheckAlert from "react-native-awesome-alert";
import {modificaIDEscolhido} from '../actions/ProblemaActions';


  

export const Perfil = (props) =>  {
    const [problems, setProblems] = useState([]);
    const [user, setUser] = useState({});
    const [qtd, setQtd] = useState('');

    const SimpleView = (<View style={styles.modalView}> </View>);
 
    function onPressShowSimpleAlert(id) {
        this.checkAlert.alert("Você tem certeza que deseja deletar o problema?", SimpleView, [
          { text: "Cancelar", onPress: () => {} },
          { text: "Sim", onPress: () => deletarProblema(id)  }
        ])
      }
    

    function showProblemForm(id){
        props.modificaIDEscolhido(id);
        Actions.completeProblem();
    }

    async function deletarProblema(id){

        const resposta = await api.post('deletarProblema', {id});
        Alert.alert("Sucesso","O problema foi deletado!!!")
    } 
   
    

    
    
    async function loadProblems(){
        const email = props.email
        const response = await api.get('/searchProblemsByUser',{
            params: {
                email
            }
        })
        const quantidade = await api.get('/searchQTDProblemsByUser',{
            params: {
                email
            }
        })
        setQtd(quantidade.data)
        setProblems(response.data)
        loadUserName();
    }

  async function loadUserName(){
        const _id = props.id;
        console.log(_id);
        const response = await api.get(`/searchUserByID`,{
            params: {
                _id
            }
        });
        console.log(response.data);
        setUser(response.data);
    }


useEffect(() => {
    loadProblems();
    
}, []);


    return (
        <View style={styles.container}>
        <View style={styles.header}>
        <Image source={Logo} style={{width: 110, height: 100}} />
        <Text style={styles.headerText}>
            Total de problemas: <Text style={styles.headerTextBold}> {qtd} </Text>
        </Text>
        </View>

        { user ? <Text style={styles.title}>Bem-vindo {user.nome}</Text> : null}
        <TouchableOpacity onPress={() => Actions.alterarCadastro()}>
        <Text style={styles.changeData}>Alterar dados do perfil</Text>
        </TouchableOpacity>
        <Text style={styles.description}>Veja abaixo todos os problemas relatados por você!</Text>
        
        <FlatList 
            data={problems}
            style={styles.problemList}
            keyExtractor={problem => String(problem._id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: problem }) => (
                <View style={styles.problem}>
                <View style={styles.detailsButton}>
                <Text style={styles.problemProperty}>Nome: </Text>
                <TouchableOpacity onPress={() => onPressShowSimpleAlert(problem._id)}>
                    <CheckAlert
                    ref={ref => (this.checkAlert = ref)}
                    // available Modal's props options: https://facebook.github.io/react-native/docs/modal.html
                    modalProps={{
                        transparent: true,
                        animationType: "slide",
                    }}
                    checkBoxColor="red"
                    />
                    <Feather name="trash-2" size={20} color="#8a2be2" />
                </TouchableOpacity>
                </View>
                <Text style={styles.problemValue}>{problem.nomeProblema}</Text>

                <Text style={styles.problemProperty}>Area:</Text>
                <Text style={styles.problemValue}>{problem.areaProblema}</Text>

                <Text style={styles.problemProperty}>Descrição:</Text>
                <Text style={styles.problemValue}>{problem.descricaoProblema}</Text>


                <TouchableOpacity onPress={() => showProblemForm(problem._id)} style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}> Ver mais detalhes</Text>
                    <Feather name="arrow-right" size={20} color="#8a2be2" />
                </TouchableOpacity>
            </View>
            )}
        />
        </View> 

        
    )
}

const mapStateToProps = state =>(
    {
      email: state.AutenticacaoReducer.emailLogin,
      nome: state.AutenticacaoReducer.userNome,
      id: state.AutenticacaoReducer.userID
    }
    
  )
  
export default connect(mapStateToProps,{modificaIDEscolhido})(Perfil);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 15,
        color: '#737380'
    },
    headerTextBold:{
        fontWeight: 'bold',
        color: '#8a2be2',
        fontSize: 20
    },
    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 40,
        color: '#13131a',
        fontWeight: 'bold'
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380',
    },
    changeData: {
        fontSize: 16,
        lineHeight: 24,
        color: '#8a2be2',
        textDecorationLine: 'underline',
        marginBottom: 10
    },
    problemList: {
        marginTop: 25
    },
    problem: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16
    },
    problemProperty: {
        fontSize: 14,
        color:'#41414d',
        fontWeight: 'bold'
    },
    problemValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },
    detailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailsButtonText: {
        color: '#8a2be2',
        fontSize: 15,
        fontWeight: 'bold',
    },
    modalView: {
        backgroundColor: '#rgb(235,233,227)',
        borderRadius: 15,
        width: 275,
        borderColor: 'white',
        borderWidth: 0.7,
      }
}); 