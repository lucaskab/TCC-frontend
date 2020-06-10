import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync, geocodeAsync } from 'expo-location';
import api from '../../services/api';
import { Appbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions} from 'react-native-router-flux'

const ServiceProviderMain = () => {
  const [problems, setProblems] = useState([]);
  const [position, setPosition] = useState([-21.0000,-50.0000]);
  
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

    async function loadInitialPosition(){
      const { granted } = await requestPermissionsAsync();
      
      if(granted) {
        //setActivityStatus(true);
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
  
        const { latitude, longitude } = coords;
  
        setPosition({
          latitude,
          longitude,
        })
       // setActivityStatus(false);
      }     
    }
     loadInitialPosition();
     }, []);

  useEffect(() => {
    api.get('/SearchFormBuscas', {
      params: {
        areaProblema: 'Saude',
        nomeProblema: '',
        latitude: position.latitude,
        longitude: position.longitude,
        kmBusca: 10 * 1000
      }
    }).then(response => {
      setProblems(response.data)
    })},[position]);

  return (
    <View style={styles.container}>
    <Appbar.Header SafeAreaView={0} statusBarHeight={20}>
      <Appbar.BackAction onPress={() => Actions.formLogin()}/>
      <Appbar.Content title="Problemas" />
    </Appbar.Header>
    <View>
      <View style={styles.title}>
        <Text style={styles.titleText} >Bem-vindo Lucas</Text>
      </View>
      <Text style={styles.titleInfo}>Todos problemas de: Saúde </Text>
    </View>
    <ScrollView>
      {problems.map(problem => (

<View style={styles.problem} key={problem._id}>
                
<View style={styles.status}>
<Text style={styles.descriptions}>Area: </Text>
<Text style={styles.info}>{problem.areaProblema}</Text>

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

<TouchableOpacity onPress={() => Actions.problemInfo(problem._id)} style={styles.detailsButton}>
    <Text style={styles.button} > Ver mais detalhes</Text>
</TouchableOpacity>
</View>
))}
      
  </ScrollView>  
    </View>
  )
}

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
    alignItems: 'center'
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#8a2be2',
    marginBottom: 25
  },
  titleInfo: {
    paddingHorizontal: 20,
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

export default ServiceProviderMain;