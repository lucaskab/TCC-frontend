import React, {useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Appbar, ActivityIndicator, Colors } from 'react-native-paper';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync, geocodeAsync } from 'expo-location';
import { MaterialIcons, EvilIcons} from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {modificaLatitude, modificaLongitude} from '../actions/ProblemaActions';


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function ProblemRemoteLocation(props) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [local, setLocal] = useState([]);
  const [busca,setBusca] = useState('');
  const [activityStatus,setActivityStatus] = useState(false);


  async function LoadAddress(){
    console.log(props.long);
    console.log(props.lat);
    console.log("alo")
    const local1 = await geocodeAsync(busca);
 
   if(local1[0] === undefined || local1 === []){
     const { coords } = await getCurrentPositionAsync({
       enableHighAccuracy: true,
     });
     console.log(coords);
     const {latitude, longitude} = coords
     setCurrentRegion({
       latitude,
       longitude,
       latitudeDelta: 0.04,
       longitudeDelta: 0.04
     })
     modificaLatitude(currentRegion.latitude);
     modificaLongitude(currentRegion.longitude);

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
     modificaLatitude(local1[0].latitude);
     modificaLongitude(local1[0].longitude);
     } }
   

  

  useEffect(() => {

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

  if(!currentRegion) {
    return null;
  }
  console.log(currentRegion);
  return (
    
    <>
    <Appbar.Header SafeAreaView={0} statusBarHeight={20} style={{backgroundColor: '#8a2be2'}}>
        <Appbar.Action icon="menu" onPress={()=> list()} />
          <Appbar.Content title="REPORTE JÁ" titleStyle={{alignSelf: 'center'}}/>
        <Appbar.Action icon="dots-vertical" onPress={() => Actions.tutorial()} />
        </Appbar.Header>

      <DismissKeyboard>
      {currentRegion ?
      
      <MapView   initialRegion={currentRegion} style={styles.map} region={currentRegion} >
      {local.map(location => (
        <MapView.Marker  draggable={true} onDragEnd={(e) => {modificaLatitude(e.nativeEvent.coordinate.latitude), modificaLongitude(e.nativeEvent.coordinate.longitude)}} coordinate={{latitude: currentRegion.latitude, longitude: currentRegion.longitude }} />
      ))}
   
      </MapView>
      : null
    }
      
      
      </DismissKeyboard>
      <View style={styles.addForm} >
        <TouchableOpacity  onPress={() => Actions.enviarProblema()} style={styles.addButton}>
          <Text style={{fontSize:16,fontWeight: 'bold',color: '#FFF'}}>Selecionar</Text>
        </TouchableOpacity>
      </View> 
      
      
       <KeyboardAvoidingView style={styles.searchForm} behavior="padding" keyboardVerticalOffset= '20'>
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

      </KeyboardAvoidingView>
      </>
  );
}




const mapStateToProps = state =>(
  {
    nome: state.AutenticacaoReducer.userNome,
    lat: state.ProblemaReducer.Latitude,
    long: state.ProblemaReducer.Longitude,
  }
  
)

export default connect(mapStateToProps, {modificaLatitude, modificaLongitude})(ProblemRemoteLocation);

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
    height: 100
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
    top: 90,
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
    bottom: 20,
    zIndex: 5,
  },
});