import React, {useState,useEffect} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { Actions} from 'react-native-router-flux'
import { connect } from 'react-redux';
import { Appbar, ActivityIndicator, Colors } from 'react-native-paper';
import { MaterialIcons, EvilIcons} from '@expo/vector-icons';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync, geocodeAsync } from 'expo-location';
import api from '../../services/api';
import ModalSelector from 'react-native-modal-selector';
import DialogInput from 'react-native-dialog-input';


import {modificaSearchNome, modificaSearchArea, modificaSearchKM} from '../actions/SearchActions';
import {modificaIDEscolhido} from '../actions/ProblemaActions';

export const Buscas = (props) =>  {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [Problems, setProblems] = useState([]);
  const [areaVisible, setAreaVisible] = useState(null);
  const [areaBusca,setAreaBusca] = useState('');
  const [nomeVisible, setNomeVisible] = useState(null);
  const [nomeBusca,setNomeBusca] = useState('');
  const [kmVisible, setKMVisible] = useState(null);
  const [kmBusca,setKMBusca] = useState(10);
  const [buscando,setBuscando] = useState(false);
  
  async function loadProblems1() {
    setBuscando(true);
    const { latitude, longitude } = currentRegion;
    var resposta;
    const distancia = kmBusca * 1000
    if (nomeBusca === '' && areaBusca === ''){
      resposta = await api.get('/SearchFormBuscas', {
        params: {
          nomeProblema: nomeBusca,
          areaProblema: areaBusca,
          latitude,
          longitude,
          kmBusca: distancia
        }
      })
    }
    else if(nomeBusca === 'Todas as opções' && areaBusca === 'Todas as opções'){
      resposta = await api.get('/SearchFormBuscas', {
        params: {
          latitude,
          longitude,
          areaProblema: '',
          nomeProblema: '',
          kmBusca: distancia
        }
      })
    }

    else if(nomeBusca === 'Todas as opções') {
      resposta = await api.get('/SearchFormBuscas', {
        params: {
          latitude,
          longitude,
          areaProblema: areaBusca,
          nomeProblema: '',
          kmBusca: distancia
        }
      })
    }
    else if (areaBusca === 'Todas as opções'){
      resposta = await api.get('/SearchFormBuscas', {
      params: {
        latitude,
        longitude,
        areaProblema: '',
        nomeProblema: nomeBusca,
        kmBusca: distancia
      }
    })}
    else {
      resposta = await api.get('/SearchFormBuscas', {
        params: {
          latitude,
          longitude,
          areaProblema: areaBusca,
          nomeProblema: nomeBusca,
          kmBusca: distancia
        }
      })}
    
    
    setProblems(resposta.data)
    setBuscando(false);
    }
  const area = [
    { key: 0, section: true, label: 'Área do Problema:' },
    { key: 1, label: 'Todas as opções' },
    { key: 2, label: 'Saúde' },
    { key: 3, label: 'Ambiental' },
    { key: 4, label: 'Trânsito' },
];

const nome = [[{ key: 9, label: 'Todas as opções' }],
[{ key: 0, section: true, label: 'Saúde:' },,
{ key: 1, label: 'Hospital Lotado' },
{ key: 2, label: 'Foco de Dengue' },],

[{ key: 3, section: true, label: 'Trânsito:' },
{ key: 4, label: 'Acidente' },
{ key: 5, label: 'Semáforo Quebrado' },],

[{ key: 6, section: true, label: 'Ambiental:' },
{ key: 7, label: 'Alagamento' },
{ key: 8, label: 'Poluição' },]

 
];
  
  function NomeModal(){
    
    setNomeVisible(true);
    const vetor1 = nome[0].concat(nome[1]);
    const vetor2 = nome[0].concat(nome[2]);
    const vetor3 = nome[0].concat(nome[3])
    if(areaBusca === "Saúde"){ 
    return (
      <View >
                <ModalSelector visible={nomeVisible}
                    data={vetor1}
                    onChange={(nome)=> {setNomeVisible(false), setNomeBusca(nome.label) }} 
                    onModalClose={(nome)=> {setNomeVisible(false)}}
                    cancelText = {"Cancelar"}
                    />
            </View>
    )
    }

    else if(areaBusca === "Trânsito"){ 
      return (
        <View >
                  <ModalSelector visible={nomeVisible}
                      data={vetor2}
                      onChange={(nome)=> {setNomeVisible(false), setNomeBusca(nome.label) }} 
                      onModalClose={(nome)=> {setNomeVisible(false)}}
                      cancelText = {"Cancelar"}
                      />
              </View>
      )
      }

      else if(areaBusca === "Ambiental"){ 
        return (
          <View >
                    <ModalSelector visible={nomeVisible}
                        data={vetor3}
                        onChange={(nome)=> {setNomeVisible(false), setNomeBusca(nome.label) }} 
                        onModalClose={(nome)=> {setNomeVisible(false)}}
                        cancelText = {"Cancelar"}
                        />
                </View>
        )
        }
        
        
        else {
          const todos = nome[0].concat(nome[1],nome[2],nome[3]);
          return (<View >
                    <ModalSelector visible={nomeVisible}
                        data={todos}
                        onChange={(nome)=> {setNomeVisible(false), setNomeBusca(nome.label) }} 
                        onModalClose={(nome)=> {setNomeVisible(false)}} 
                        cancelText = {"Cancelar"}
                        />
                </View>)
        }
  }
  function AreaModal(){
    setAreaVisible(true);

      return (
        < >
                  <ModalSelector visible={areaVisible}
                      data={area}
                      onChange={(area)=> {setAreaVisible(false), setAreaBusca(area.label) }} 
                      onModalClose={(nome)=> {setAreaVisible(false)}}
                      cancelText = {"Cancelar"}
                      />
  
              </>
      )
    
   
  }
  function KmModal(){
    setKMVisible(true);

    return(
      <>
          <DialogInput isDialogVisible={kmVisible}
            title={"Distância"}
            message={"Digite o raio de busca em KM"}
            hintInput ={"ex: 10"}
            submitInput={ (inputText) => {setKMBusca(inputText),setKMVisible(false) }}
            closeDialog={ () => {setKMVisible(false)}}>
          </DialogInput>
      </>
    )
  }
  async function loadAllProblems() {
    
    const resposta = await api.get('/searchAllProblems')
    setProblems(resposta.data)
    
  }
function showProblemInfo(id){
  props.modificaIDEscolhido(id);
  Actions.completeProblem();
}
  
  useEffect(() => {
    
    async function loadInitialPosition(){
    
      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      const { latitude, longitude } = coords;

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      })
    }  

    loadInitialPosition();
    loadAllProblems();
}, []);


    return (
      <>
      <Appbar.Header SafeAreaView={0} statusBarHeight={20} style={{backgroundColor: '#8a2be2'}}>
          <Appbar.BackAction onPress={() => Actions.navigation()} />
          <Appbar.Content title="Buscas" />
        </Appbar.Header>
      
      
      <MapView   initialRegion={currentRegion} style={styles.map} region={currentRegion} >
      {currentRegion ? 
      <>
      {Problems.map(problem => (
        <MapView.Marker key={problem._id} coordinate={{ latitude: problem.posicao.coordinates[1] , longitude: problem.posicao.coordinates[0], title:"title", description:"description" }} >
        <Callout onPress={() => showProblemInfo(problem._id)}>
            <View  style={ styles.callout }>   
              <Text style={styles.user}>Area: {problem.areaProblema} </Text>
              <Text style={styles.problem}> Nome: {problem.nomeProblema}</Text>
              <Text style={styles.problem}> Descrição: {problem.descricaoProblema}</Text>
              <Text style={styles.data}>Reportado em: {problem.CreatedAt} </Text>
            </View>
        </Callout>
        </MapView.Marker>
      ))}
      </>
      : null}
      </MapView>
      
      {areaVisible ? <AreaModal /> : null }
      {nomeVisible ? <NomeModal /> : null }
      {kmVisible ? <KmModal /> : null }
      
      <Text style={{ position:'absolute', left: 5, fontSize: 15, fontWeight: 'bold', marginBottom: 10, top: 80}}>Área:{areaBusca}, Nome: {nomeBusca}, Distância: {kmBusca} KM</Text>
      <View style={styles.searchForm}> 
      <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity  onPress={() => AreaModal()} style={styles.loadButton}>
          <Text style={{color: 'white'}}>Área</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => NomeModal()} style={styles.loadButton}>
          <Text style={{color: 'white'}}>Nome</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => KmModal()} style={styles.loadButton}>
          <Text style={{color: 'white'}}>Distância</Text>
        </TouchableOpacity>

      </ScrollView>
      {buscando ? <ActivityIndicator animating={buscando} color={Colors.red800} />  : 
      <TouchableOpacity  onPress={() => loadProblems1()} style={styles.loadButton}>
      <Text style={{color: 'white'}}>Search</Text>
    </TouchableOpacity> }
      
      </View>
    </>
    )
}

const mapStateToProps = state =>(
  {
    nomeProblema: state.SearchReducer.SearchNome,
    areaProblema: state.SearchReducer.SearchArea,
    raio: state.SearchReducer.SearchKM
  }
  
)

export default connect(mapStateToProps,{modificaSearchNome, modificaSearchArea, modificaSearchKM,modificaIDEscolhido})(Buscas);

const styles = StyleSheet.create({
  map: {
    flex:1
  },
  searchForm: {
    position: 'absolute',
    top: 110,
    left: 3,
    right: 5,
    zIndex: 5,
    flexDirection: 'row',
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
    width: 65,
    height: 30,
    backgroundColor: '#8E4Dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
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
});