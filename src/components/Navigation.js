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


import FormCadastroProblema from './FormCadastroProblema';
import formLogin from './FormLogin';
import AlterarCadastro from './AlterarCadastro';
import Perfil from './Perfil';
import Buscas from './Buscas';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function HomeScreen({ navigation }, props) {
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

  function LoadIcons(props){
    const icone = props.icone;
    if(icone === "Trânsito"){
      return (<MaterialIcons name="directions-car" size={30} color="black" />)
    }
    else if(icone === "Saúde"){
      return (<MaterialIcons name="local-hospital" size={30} color="red" />)
    }
    else if(icone === "Ambiental") {
      return (<EvilIcons name="trash" size={40} color="grey"/>)
    }
    else return(null)
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
  

  function list(){
    Keyboard.dismiss();
    navigation.openDrawer();
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
    <Appbar.Header SafeAreaView={0} statusBarHeight={20} style={{backgroundColor: '#8a2be2'}}>
        <Appbar.Action icon="menu" onPress={()=> list()} />
          <Appbar.Content title="REPORTE JÁ" titleStyle={{alignSelf: 'center'}}/>
        <Appbar.Action icon="dots-vertical" onPress={() => Actions.tutorial()} />
        </Appbar.Header>

      <DismissKeyboard>
      {activityStatus ? <ActivityIndicator animating={activityStatus} color={Colors.red800} />
      :
      <MapView   initialRegion={currentRegion} style={styles.map} region={currentRegion} >
      {local.map(location => (
        <MapView.Marker  draggable={true} onDragEnd={(location) => setCurrentRegion(location.nativeEvent.coordinate)}  coordinate={{latitude: currentRegion.latitude, longitude: currentRegion.longitude }} />
      ))}
      {Problems.map(problem => (
        <MapView.Marker key={problem._id} coordinate={{ latitude: problem.posicao.coordinates[1] , longitude: problem.posicao.coordinates[0], title:"title", description:"description" }} >
        <LoadIcons icone={problem.areaProblema} />
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
      
      
      </DismissKeyboard>
      <View style={styles.addForm} >
        <TouchableOpacity  onPress={() => Actions.formCadastroProblema()} style={styles.addButton}>
          <Text style={{fontSize:16,fontWeight: 'bold',color: '#FFF'}}>Clique aqui e REPORTE JÁ!</Text>
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


    
     

const Drawer = createDrawerNavigator();

export const App = (props) =>   {
  return (
    
    <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName="Home" 
      drawerStyle={{backgroundColor: '#4b0082'}} 
      drawerContentOptions={{contentContainerStyle:{marginTop: 10}, activeTintColor: '#8a2be2', 
                            inactiveTintColor: '#8a2be2', inactiveBackgroundColor: '#d3d3d3', 
                            activeBackgroundColor: '#d3d3d3',  itemStyle: { marginTop: 20 }, 
                            labelStyle: {fontSize: 25}
      }} 
      >
         
         <Drawer.Screen name={props.nome} component={HomeScreen} 
        options={{
        
          drawerIcon: config => <Image source={require('../imgs/eu.jpeg')} 
                                  style={{ height: 40, width: 50, paddingTop: 60, borderRadius: 100}}
                                />
        }}/>

        <Drawer.Screen name="Perfil" component={Perfil} 
        options={{
        
          drawerIcon: config => <MaterialIcons name="comment" size={20} color="#8a2be2" />
        }}/>

        <Drawer.Screen name="Reporte Já" component={FormCadastroProblema}  
                options={{
                  drawerIcon: config => <MaterialIcons name="room" size={20} color="#8a2be2" />
                }}/>

        <Drawer.Screen name="Buscar" component={Buscas} 
                options={{
                
                  drawerIcon: config => <MaterialIcons name="search" size={20} color="#8a2be2" />
                }}/>      

        <Drawer.Screen name="Alterar Cadastro" component={AlterarCadastro} 
                options={{
                  drawerIcon: config => <MaterialIcons name="contact-mail" size={20} color="#8a2be2" />
                }}/>        

        <Drawer.Screen name="Sair" component={formLogin} 
         options={{
          drawerIcon: config => <MaterialIcons name="exit-to-app" size={20} color="#8a2be2" />
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = state =>(
  {
    nome: state.AutenticacaoReducer.userNome
  }
  
)

export default connect(mapStateToProps, {modificaIDEscolhido})(App);

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