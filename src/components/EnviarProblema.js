import React, { Component ,useState, useEffect} from "react";
import { StyleSheet, Image, ScrollView, Picker, TextInput,Alert, Keyboard, TouchableOpacity, ActivityIndicator } from "react-native";
import { Actions} from 'react-native-router-flux'
import {  View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Button, Input, Icon } from 'native-base';
import { connect } from 'react-redux';
import Data from '../data/data';
import AreaData from '../data/areaData';
import { getCurrentPositionAsync, geocodeAsync } from 'expo-location';
import { modificaDescricao,modificaSugestao} from '../actions/ProblemaActions'
import api from '../../services/api';
import StepIndicator from 'react-native-step-indicator';
import { Appbar, RadioButton } from 'react-native-paper';
import MapView from 'react-native-maps';
import { MaterialIcons} from '@expo/vector-icons';

const IndicatorStyles = {
  stepIndicatorSize: 15,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#8a2be2',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#8a2be2',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#8a2be2',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#8a2be2',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
}

    export const EnviarProblema = (props) =>  {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [remoteLocation, setRemoteLocation] = useState(false);
    const [escolha, setEscolha] = useState("Acessibilidade");
    const [nomeProblema, setNomeProblema] = useState("Acessibilidade digital");
    const [currentRegion, setCurrentRegion] = useState(null);
    const [bolinhas, setBolinhas] = useState(0);
    const [local, setLocal] = useState([]);
    const [busca,setBusca] = useState('');
    const [checked, setChecked] = useState('first');
    const [activityI, setActivityI] = useState(false);
    
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
       } }

    async function cadastrarProblems(email, nomeProblema, Descricao, areaProblema, latitude, longitude, sugestao){
      setActivityI(true);
      var arrayDeURL  = [props.Foto1, props.Foto2, props.Foto3, props.Foto4, props.Foto5];

      const urlFoto =  [];
      for(var i = 0; i <5; i++){
      var index = arrayDeURL[i].lastIndexOf("/") + 1;
      var filename = arrayDeURL[i].substr(index);

      const form = new FormData();
      form.append('file', {
        name: filename,
        uri: arrayDeURL[i],
        type: 'image/jpeg'
      });
      const headers = {
        'Content-Type': 'multipart/form-data'
      };

      const result = await api.post('/pictureToServer',form, headers);


      urlFoto[i] = filename;
    }
      
      await api.post('/problems', {email,nomeProblema, Descricao, urlFoto, areaProblema, latitude, longitude, sugestao})
      setActivityI(false);
      Alert.alert("Problema","Seu problema foi reportado com sucesso!!");
      props.modificaDescricao("");
      props.modificaSugestao("");
      Actions.reset('navigation');
    
    }

    function RemoteLocation(){
      setRemoteLocation(true);
      setChecked('second');
    }
    function MomentLocation(){
      setRemoteLocation(false);
      setChecked('first');
      loadInitialPosition();
    }
    async function loadInitialPosition(){

      setRemoteLocation(false);
     
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
      }  

    useEffect(() => {

      loadInitialPosition();
    }, []);
  
    if(!currentRegion) {
      return null;
    }
    

    const cards = [
      {
        text: 'Card One',
        name: 'One',
        image:  {uri:props.Foto1}
      },
      {
          text: 'Card Two',
          name: 'Two',
          image: {uri:props.Foto2}
        },
        {
          text: 'Card Two',
          name: 'Two',
          image: {uri:props.Foto3}
        },
        {
          text: 'Card Two',
          name: 'Two',
          image: {uri:props.Foto4}
        },
        {
          text: 'Card Two',
          name: 'Two',
          image: {uri:props.Foto5}
        },
    ];

function NomeProblema(){
    if(escolha === "Acessibilidade"){
        return(
            <Picker
            style={{width: 210, height:25 }}
            selectedValue={nomeProblema}
            onValueChange={value => setNomeProblema(value)}
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
            style={{width: 220, height:25 }}
            selectedValue={nomeProblema}
            onValueChange={value => setNomeProblema(value)}
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
          style={{width: 220, height:25 }}
          selectedValue={nomeProblema}
          onValueChange={value => setNomeProblema(value)}
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
        style={{width: 220, height:25 }}
        selectedValue={nomeProblema}
        onValueChange={value => setNomeProblema(value)}
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
      style={{width: 220, height:25 }}
      selectedValue={nomeProblema}
      onValueChange={value => setNomeProblema(value)}
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
      style={{width: 220, height:25 }}
      selectedValue={nomeProblema}
      onValueChange={value => setNomeProblema(value)}
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
      style={{width: 220, height:25 }}
      selectedValue={nomeProblema}
      onValueChange={value => setNomeProblema(value)}
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
      style={{width: 220, height:25 }}
      selectedValue={nomeProblema}
      onValueChange={value => setNomeProblema(value)}
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
      style={{width: 220, height:25 }}
      selectedValue={nomeProblema}
      onValueChange={value => setNomeProblema(value)}
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
      style={{width: 220, height:25 }}
      selectedValue={nomeProblema}
      onValueChange={value => setNomeProblema(value)}
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
      style={{width: 220, height:25 }}
      selectedValue={nomeProblema}
      onValueChange={value => setNomeProblema(value)}
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
      style={{width: 220, height:25 }}
      selectedValue={nomeProblema}
      onValueChange={value => setNomeProblema(value)}
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
      style={{width: 220, height:25 }}
      selectedValue={nomeProblema}
      onValueChange={value => setNomeProblema(value)}
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
      style={{width: 220, height:25 }}
      selectedValue={nomeProblema}
      onValueChange={value => setNomeProblema(value)}
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
      style={{width: 220, height:25 }}
      selectedValue={nomeProblema}
      onValueChange={value => setNomeProblema(value)}
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
      style={{width: 220, height:25 }}
      selectedValue={nomeProblema}
      onValueChange={value => setNomeProblema(value)}
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
      style={{width: 220, height:25 }}
      selectedValue={nomeProblema}
      onValueChange={value => setNomeProblema(value)}
      >
        {Data.Transporte.map(item => {
            return (<Picker.Item label={item} value={item} />)
          })} 

    </Picker>
  )
}

  
  }

function SwipeDireita(){
  if(bolinhas == 4){
    setBolinhas(0)
  }
  else setBolinhas(bolinhas + 1)
}

function SwipeEsquerda(){
  if(bolinhas == 0){
    setBolinhas(4)
  }
  else setBolinhas(bolinhas - 1)
}
    

  return (
    <>
    
    <Appbar.Header SafeAreaView={0} statusBarHeight={20} style={{backgroundColor: '#8a2be2'}}>
        <Appbar.BackAction onPress={() => Actions.formCadastroProblema()} />  
        <Appbar.Content title="Reporte aqui o seu Problema" />
    </Appbar.Header>



    <ScrollView style={styles.container} >
    <View style={styles.picker}>
      <Text style={styles.text}>{'Área:'}</Text>
        <Picker
            style={{width: 220, height:25 }}
            selectedValue={escolha}
            onValueChange={value => setEscolha(value) , value => setEscolha(value) 
            }
        >
          {AreaData.map(item => {
              return (<Picker.Item label={item} value={item} />)
            })} 
        </Picker>
    </View> 
    <View style={styles.picker}>
            <Text style={styles.text}>{'Nome:'}</Text>
                <NomeProblema />
    </View>      
                <Text style={styles.text}>{'Descrição:'}</Text>      
                <View style={styles.textAreaContainer} >
                    <TextInput
                      style={styles.textArea}
                      underlineColorAndroid="transparent"
                      placeholder="Descreva detalhadamente o problema."
                      placeholderTextColor="black"
                      numberOfLines={10}
                      multiline={true}
                      value={props.descricao}
                      onChangeText={texto => props.modificaDescricao(texto)}
                    />
                </View>

                <Text style={styles.text}>{'Sugestão:'}</Text>      
                <View style={styles.textAreaContainer} >
                    <TextInput
                      style={styles.textArea}
                      underlineColorAndroid="transparent"
                      placeholder="Deixe aqui sua sugestão para a solução deste problema: (Opcional)"
                      placeholderTextColor="black"
                      numberOfLines={10}
                      multiline={true}
                      value={props.sugestao}
                      onChangeText={texto => props.modificaSugestao(texto)}
                    />
                </View>
      <View style={{ paddingTop: 20}}> 
      <Text style={styles.text}>{'Imagens:'}</Text>          
      <DeckSwiper
        ref={() => {}}
        dataSource={cards}
        looping= {false}
        onSwipeRight={() => SwipeEsquerda()  }
        onSwipeLeft={() => SwipeDireita() }
        renderItem={() =>
          <Card style={{  paddingBottom: 20 }}>
            <CardItem cardBody>
              <Image style={{ height: 300, flex: 1 }} source={cards[bolinhas].image} />
            </CardItem>
            <View style={{paddingTop: 10}}>
              <StepIndicator
              customStyles={IndicatorStyles}
              currentPosition={bolinhas}
              />
            </View>
          </Card>
        }
      />
      </View>

      <View style={{flexDirection: "row",alignItems: 'center', marginTop:375}}>
      <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={MomentLocation}
        color="#8E4Dff"
      />
      <Text>Localização Atual</Text>
      </View>
      <View style={{flexDirection: "row", alignItems: 'center'}}>
      <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => RemoteLocation()}
        color="#8E4Dff"
      />
      <Text>Selecionar uma localização</Text>
      </View>
      {remoteLocation && (
        <>
                <View style={styles.addForm} >

              </View> 
              
              
               <View style={styles.searchForm}>
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

              <View>
              {currentRegion ?
              
              <MapView   initialRegion={currentRegion} style={styles.map} region={currentRegion} >
              {local.map(location => (
                <MapView.Marker  draggable={true} onDragEnd={(e) => {setCurrentRegion({latitude:e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude})}} coordinate={{latitude: currentRegion.latitude, longitude: currentRegion.longitude }} />
              ))}
           
              </MapView>
              : null
            }
                
              
              </View>

              </>
      )}

        {activityI ? <ActivityIndicator size="small" color="#0000ff" style={{marginBottom: 30}}/> :
          <Button  onPress={() => cadastrarProblems(props.email, nomeProblema, props.Descricao, escolha, currentRegion.latitude, currentRegion.longitude, props.sugestao)} style={{ marginTop:10, marginBottom:35, backgroundColor: '#8a2be2', justifyContent: 'center'}} >
          <Text >Enviar Problema</Text>
          </Button>
        }    
        
      
  </ScrollView>
  </>
  );
}

const mapStateToProps = state =>(
  {
    Foto1: state.ProblemaReducer.Foto1,
    Foto2: state.ProblemaReducer.Foto2,
    Foto3: state.ProblemaReducer.Foto3,
    Foto4: state.ProblemaReducer.Foto4,
    Foto5: state.ProblemaReducer.Foto5,
    email: state.AutenticacaoReducer.emailLogin,
    Descricao: state.ProblemaReducer.Descricao,
    sugestao: state.ProblemaReducer.Sugestao,
    latitude: state.ProblemaReducer.Latitude,
    longitude: state.ProblemaReducer.Longitude,
  }
  
)

export default connect(mapStateToProps, {modificaDescricao,modificaSugestao})(EnviarProblema);


const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#FFF'
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    borderRadius: 8,
    
  },
  text: {
    fontSize: 15,
    padding: 5,
    color: '#8a2be2',
    fontWeight: 'bold'
  },
  textAreaContainer: {
    borderColor: '#8a2be2',
    borderWidth: 0.9,
    borderRadius: 8,
    padding: 10,
    height: 130,
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    elevation: 2
    
  },
  textArea: {
    height: 130,
    width: 300,
    justifyContent: "flex-start",
    textAlignVertical: 'top',
  },
  map: {
    width: 400,
    height: 300
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
    top: 60,
    left: 1,
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
    alignSelf: 'center',
    marginLeft: 15,
  },
  addForm: {
    alignSelf: 'center',
    bottom: 20,
    zIndex: 5,
  },
});