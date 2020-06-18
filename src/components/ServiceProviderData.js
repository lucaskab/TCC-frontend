import React, {useEffect, useState, useCallback} from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync, geocodeAsync } from 'expo-location';
import api from '../../services/api';
import { Appbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from '@expo/vector-icons/Feather';

const ServiceProviderData = (props) => {
  const [problems, setProblems] = useState([]);
  const [user, setUser] = useState({});
  const [data, setData] = useState(1);
  const [qtd, setQtd] = useState(0);
  
  function handleCircleColor(status) {
    if(status === "Avaliando") {
      return {
        width: 15,
        height: 15,
        borderRadius: 15/2,
        backgroundColor: 'red',
        marginLeft: 10
      }
    }
    else if(status === "Andamento") {
      return {
        width: 15,
        height: 15,
        borderRadius: 15/2,
        backgroundColor: 'yellow',
        marginLeft: 10
      }
    }
    else {
      return {
        width: 15,
        height: 15,
        borderRadius: 15/2,
        backgroundColor: 'green',
        marginLeft: 10
      }
    }
  }

  useEffect(() => {
    const email = props.email;
    api.post('userscadastrados', {email}).then(response => {
      setUser(response.data),
      setData(5)
    })} , []);

  useEffect(() => {

    api.get('/searchProblemsFromProvider', {
      params: {
        idPrestador: user._id,
      }
    }).then(response => {
      setProblems(response.data)
    })

  },[data]);

  useEffect(() => {
    api.get('searchQTDProblemsByUser', {
      params: {
        email: props.email
      }
    }).then(response => {
      setQtd(response.data)
    })
  }, []);

  return (
    <View style={styles.container}>
    <Appbar.Header SafeAreaView={0} statusBarHeight={20}>
      <Appbar.BackAction onPress={() => Actions.reset('formLogin')}/>
      <Appbar.Content title="Seus problemas" />
    </Appbar.Header>
    <View>
      <Text style={styles.titleInfo}>Você possui um total de: {qtd} problemas </Text>
    </View>
    {problems ? 
      <FlatList 
      data={problems}
      keyExtractor={(problem) => problem._id}
      renderItem={({ item: problem}) => (
        <View style={styles.problem}>
                          
        <View style={styles.status}>
          <Text style={styles.descriptions}>Nome: </Text>
          <Text style={styles.info}>{problem.nomeProblema}</Text>
        </View>

        <View style={styles.status}>
          <Text style={styles.descriptions}>Descrição: </Text>
          <Text style={styles.info}>{problem.descricaoProblema}</Text>
        </View>

        <View style={styles.status}>
          <Text style={styles.descriptions}>Status: </Text>
          <Text style={styles.info}>{problem.status}</Text>
          <View style={handleCircleColor(problem.status)}></View>
        </View>


          <TouchableOpacity onPress={() => Actions.problemInfo({problemId: problem._id , flag: 1} )} style={styles.detailsButton}>
              <Text style={styles.button} > Ver mais detalhes</Text>
          </TouchableOpacity>
      </View>
      )}
    />
    : null}
      

    </View>
  )
}

 const mapStateToProps = state =>(
  {
    email: state.AutenticacaoReducer.emailLogin,
  }
);


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  problem: {
    padding: 24,
    borderRadius: 8,
    borderColor: '#269846',
    backgroundColor: '#FFF',
    marginBottom: 16,
    marginHorizontal: 20
  },
  descriptions: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8a2be2',
  },
  info: {
    fontSize: 14,
    color:'black',
    marginRight: 20
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#8a2be2',
    marginBottom: 25,
    paddingTop: 20
  },
  titleInfo: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8a2be2'
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#8a2be2',
    marginTop: 5
  },
  distance: {
    marginRight: 20
  }
  
})


export default connect(mapStateToProps)(ServiceProviderData);