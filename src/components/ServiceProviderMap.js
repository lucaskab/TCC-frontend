import React, {useState, useEffect} from 'react';
import { BackHandler,Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar, ActivityIndicator, Colors } from 'react-native-paper';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync, geocodeAsync } from 'expo-location';
import { MaterialIcons, EvilIcons} from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import api from '../../services/api';
import { connect } from 'react-redux';
import {modificaIDEscolhido} from '../actions/ProblemaActions';



const ServiceProviderMap = () => {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [Problems, setProblems] = useState([]);
  const [local, setLocal] = useState([]);
  const [areaProblema, setAreaProblema] = useState('');
  const [busca,setBusca] = useState('');
  const [activityStatus,setActivityStatus] = useState(false);

 async function LoadAddress(){
   const local1 = await geocodeAsync(busca);

  if(local1[0] === undefined || local1 === []){
    const { coords } = await getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    const {latitude, longitude} = coords
    setCurrentRegion({
      latitude,
      longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04
    })
  }
  else{
  const result = {
    latitude: local1[0].latitude,
    longitude: local1[0].longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  }
   setLocal([result])
   setCurrentRegion({
     latitude: local1[0].latitude,
     longitude: local1[0].longitude,
     latitudeDelta: 0.02,
     longitudeDelta: 0.02,
   })
  }
   
  }
  

  async function loadProblems() {
    const { latitude, longitude } = currentRegion;
    var resposta;
    const qtd = areaProblema.length
    if(qtd != 0){
     resposta = await api.get('/search', {
      params: {
        latitude,
        longitude,
        areaProblema
      }
    })
    setProblems(resposta.data.problem)
    }
  
   else if (qtd == 0) {
     resposta = await api.get('/searchAllProblems')

    setProblems(resposta.data)
    
    }
  }
  useEffect(() => {
 
   const a = loadAllProblems();

    async function loadInitialPosition(){
      const { granted } = await requestPermissionsAsync();
      
      if(granted) {
        setActivityStatus(true);
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
        setActivityStatus(false);
      }  
    }
    
    loadInitialPosition();
    
  }, []);

  async function loadAllProblems() {

    const resposta = await api.get('/searchAllProblems')

    setProblems(resposta.data)
    
  }

  if(!currentRegion) {
    return null;
  }

  return (
    <>
      {activityStatus ? <ActivityIndicator animating={activityStatus} color={Colors.red800} />
      :
      <MapView   initialRegion={currentRegion} style={styles.map} region={currentRegion} >
      {local.map(location => (
        <MapView.Marker  draggable={true} onDragEnd={(location) => setCurrentRegion(location.nativeEvent.coordinate)}  coordinate={{latitude: currentRegion.latitude, longitude: currentRegion.longitude }} />
      ))}
      {Problems.map(problem => (
        <MapView.Marker key={problem._id} coordinate={{ latitude: problem.posicao.coordinates[1] , longitude: problem.posicao.coordinates[0], title:"title", description:"description" }} >
        <Callout onPress={() => Actions.problemInfo({problemId: problem._id , flag: 0} )}>
            <View  style={ styles.callout }>   
              <Text style={styles.user}>Area: {problem.areaProblema} </Text>
              <Text style={styles.problem}> Nome: {problem.nomeProblema}</Text>
              <Text style={styles.problem}> Descrição: {problem.descricaoProblema}</Text>
              <Text style={styles.problem}> Status: {problem.status}</Text>
              <Text style={styles.data}>Reportado em: {problem.CreatedAt} </Text>
            </View>
        </Callout>
        </MapView.Marker>
      ))}

      </MapView>
    }

       <View style={styles.searchForm} behavior="padding" keyboardVerticalOffset= '20'>
        <TextInput 
        style={styles.searchInput} 
        placeholder="Pesquisar uma localização..."
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={busca}
        onChangeText={texto => setBusca(texto)}
        />
        <TouchableOpacity  onPress={() => {LoadAddress()}} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>

      </View>
      </>
  );
}


export default ServiceProviderMap;

const styles = StyleSheet.create({
  map: {
    flex:1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  callout: {
    width: 200,
    height: 150
  },
  user:{
    fontWeight: 'bold',
    fontSize: 16
  },
  problem: {
    color: '#666',
    marginTop: 5
  },
  data: {
    marginTop: 5
  },
  searchForm: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4Dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  addButton: {
    width: 225,
    height: 60,
    backgroundColor: '#8E4Dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  addForm: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    zIndex: 5,
  },
});