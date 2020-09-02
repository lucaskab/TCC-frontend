import React, {useState,useEffect} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Picker} from 'react-native';
import { Actions} from 'react-native-router-flux'
import { connect } from 'react-redux';
import { Appbar, ActivityIndicator, Colors } from 'react-native-paper';
import { MaterialIcons, EvilIcons} from '@expo/vector-icons';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync, geocodeAsync } from 'expo-location';
import api from '../../services/api';
import ModalSelector from 'react-native-modal-selector';
import DialogInput from 'react-native-dialog-input';
import AreaData from '../data/areaData';
import Data from '../data/data';


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
  const [escolha, setEscolha] = useState();
  
  
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

  function NomeProblema(){
    if(escolha === "Acessibilidade"){
        return(
            <Picker
            style={{width: 210, height:25 }}
            onValueChange={value => setNomeBusca(value)}
            >
            {Data.Acessibilidade.map(item => {
              return (<Picker.Item label={item} value={item} />)
            })} 
          </Picker>
        )
    }
    if(escolha === "Animais"){
        return(
            <Picker
            style={{width: 250, height:3,position: 'absolute' }}
            onValueChange={value => setNomeBusca(value)}
            >
              {Data.Animais.map(item => {
              return (<Picker.Item label={item} value={item} />)
            })} 
          </Picker>
        )
    }
    if(escolha === "Assistência Social"){
      return(
          <Picker
          style={{width: 250, height:3,position: 'absolute' }}
          onValueChange={value => setNomeBusca(value)}
          >
            {Data.Assistência_Social.map(item => {
              return (<Picker.Item label={item} value={item} />)
            })} 

        </Picker>
      )
  }
  if(escolha === "Comércio e Serviço"){
    return(
        <Picker
        style={{width: 250, height:3,position: 'absolute' }}
        onValueChange={value => setNomeBusca(value)}
        >
          {Data.Comércio_e_Serviço.map(item => {
              return (<Picker.Item label={item} value={item} />)
            })} 

      </Picker>
    )
}
if(escolha === "Conservação Urbana"){
  return(
      <Picker
      style={{width: 250, height:3,position: 'absolute' }}
      onValueChange={value => setNomeBusca(value)}
      >
        {Data.Conservação_Urbana.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}
if(escolha === "Cultura, Lazer e Turismo"){
  return(
      <Picker
      style={{width: 250, height:3,position: 'absolute' }}
      onValueChange={value => setNomeBusca(value)}
      >
        {Data.Cultura_Lazer_Turismo.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}
if(escolha === "Defesa Civil"){
  return(
      <Picker
      style={{width: 250, height:3,position: 'absolute' }}
      onValueChange={value => setNomeBusca(value)}
      >
        {Data.Defesa_Civil.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}
if(escolha === "Documentos e Processos"){
  return(
      <Picker
      style={{width: 250, height:3,position: 'absolute' }}
      onValueChange={value => setNomeBusca(value)}
      >
        {Data.Documentos_Processos.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}
if(escolha === "Educação"){
  return(
      <Picker
      style={{width: 250, height:3,position: 'absolute' }}
      onValueChange={value => setNomeBusca(value)}
      >
        {Data.Educação.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}
if(escolha === "Limpeza Urbana"){
  return(
      <Picker
      style={{width: 250, height:3,position: 'absolute' }}
      onValueChange={value => setNomeBusca(value)}
      >
        {Data.Limpeza_Urbana.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}
if(escolha === "Meio Ambiente"){
  return(
      <Picker
      style={{width: 250, height:3,position: 'absolute' }}
      onValueChange={value => setNomeBusca(value)}
      >
        {Data.Meio_Ambiente.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}
if(escolha === "Obras, Estruturas e Imóveis"){
  return(
      <Picker
      style={{width: 250, height:3,position: 'absolute' }}
      onValueChange={value => setNomeBusca(value)}
      >
        {Data.Obras_Estruturas_Imóveis.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}
if(escolha === "Ordem Pública"){
  return(
      <Picker
      style={{width: 250, height:3,position: 'absolute' }}
      onValueChange={value => setNomeBusca(value)}
      >
        {Data.Ordem_Pública.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}
if(escolha === "Saúde e Vigilancia Sanitária"){
  return(
      <Picker
      style={{width: 250, height:3,position: 'absolute' }}
      onValueChange={value => setNomeBusca(value)}
      >
        {Data.Saúde_Vigilancia_Sanitária.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}
if(escolha === "Serviços Funerários"){
  return(
      <Picker
      style={{width: 250, height:3,position: 'absolute' }}
      onValueChange={value => setNomeBusca(value)}
      >
        {Data.Serviços_Funerários.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}
if(escolha === "Trânsito"){
  return(
      <Picker
      style={{width: 250, height:3,position: 'absolute' }}
      onValueChange={value => setNomeBusca(value)}
      >
        {Data.Trânsito.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}
if(escolha === "Transporte"){
  return(
      <Picker
      style={{width: 250, height:3,position: 'absolute' }}
      onValueChange={value => setNomeBusca(value)}
      >
        {Data.Transporte.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}
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
      <View style={{flexDirection:"column", backgroundColor: 'red'}}>
      {areaVisible ? <AreaModal /> : null }
      {nomeVisible ? <NomeModal /> : null }
      {kmVisible ? <KmModal /> : null }
      </View>
      
      <Text style={{position: 'absolute', left: 5, fontSize: 15, fontWeight: 'bold', marginBottom: 10, top: 80}}>Área:{areaBusca}</Text>
      <Text style={{position: 'absolute', left: 5, fontSize: 15, fontWeight: 'bold', marginBottom: 10, top: 100 }}>Nome: {nomeBusca}, </Text>
      <Text style={{position: 'absolute', left: 5, fontSize: 15, fontWeight: 'bold', marginBottom: 10, top: 120}}>Distância: {kmBusca} KM</Text>
      <View style={styles.searchForm}> 
      <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.loadButton}>
      <Text style={{color: 'white', alignSelf:"center"}}>Área</Text>
        <Picker
            style={{width: 250, height:3,position: 'absolute' }}
            selectedValue={escolha}
            onValueChange={item => {setAreaBusca(item), setEscolha(item), setNomeBusca("")} }
        >
          {AreaData.map(item => {
              return (<Picker.Item label={item} value={item} />)
            })} 
        </Picker>
          
        </View>

        <View style={styles.loadButton}>
      <Text style={{color: 'white', alignSelf:"center"}}>Nome</Text>
            {escolha ? <NomeProblema /> : null}
        </View>
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
    bottom: 50,
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
    height: 60,
    backgroundColor: '#8E4Dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  callout: {
    width: 200,
    height: 150,
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
  picker: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    borderRadius: 8,
    
  },
});