import React, { Component ,useState, useEffect} from "react";
import { StyleSheet, Image, ScrollView, Picker, TextInput,Alert } from "react-native";
import { Actions} from 'react-native-router-flux'
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Button, Input, Icon } from 'native-base';
import { connect } from 'react-redux';
import { getCurrentPositionAsync } from 'expo-location';
import { modificaDescricao,modificaSugestao} from '../actions/ProblemaActions'
import api from '../../services/api';
import * as Font from 'expo-font';
import StepIndicator from 'react-native-step-indicator';
import { Appbar } from 'react-native-paper';

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
    const [escolha, setEscolha] = useState("Saude");
    const [nomeProblema, setNomeProblema] = useState("Hospital Lotado");
    const [currentRegion, setCurrentRegion] = useState(null);
    const [bolinhas, setBolinhas] = useState(0);
   
    async function cadastrarProblems(email, nomeProblema, Descricao, areaProblema, latitude, longitude, sugestao){
      
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

      urlFoto[i] = result.data.url;
    }
    

      await api.post('/problems', {email,nomeProblema, Descricao, urlFoto, areaProblema, latitude, longitude, sugestao})
      Alert.alert("Problema","Seu problema foi reportado com sucesso!!");
      Actions.navigation();
    
    }

    function RemoteLocation(){
      setRemoteLocation(true);
      Actions.problemRemoteLocation();
    }


    useEffect(() => {

      
      async function loadInitialPosition(){
        setRemoteLocation(false);

        const retorno = await Font.loadAsync({
          'adventpro-regular': require('../../assets/fonts/adventpro-regular.ttf'),
          'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
          'Roboto_medium': require('../../assets/fonts/Roboto-Medium.ttf')
  
          })
       
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
    if(escolha == "Saude"){
        return(
            <Picker
            style={{ backgroundColor: "#DCDCDC", width: 210, height:25 }}
            selectedValue={nomeProblema}
            onValueChange={value => setNomeProblema(value)}
          >
            <Picker.Item label="Hospital Lotado" value= "Hospital Lotado" />
      <Picker.Item label="Foco de Dengue" value="Foco de Dengue" />
          </Picker>
        )
    }
    if(escolha == "Transito"){
        return(
            <Picker
            style={{ backgroundColor: "#DCDCDC", width: 220, height:25 }}
            selectedValue={nomeProblema}
            onValueChange={value => setNomeProblema(value)}
          >
            <Picker.Item label="Semáforo Quebrado" value= "Semáforo Quebrado" />
        <Picker.Item label="Acidente" value="Acidente" />
          </Picker>
        )
    }
    if(escolha == "Ambiental"){
      return(
          <Picker
          style={{ backgroundColor: "#DCDCDC", width: 220, height:25 }}
          selectedValue={nomeProblema}
          onValueChange={value => setNomeProblema(value)}
        >
          <Picker.Item label="Poluição" value= "Poluição" />
      <Picker.Item label="Alagamento" value="Alagamento" />
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
        <Appbar.Content title="Enviar" />
    </Appbar.Header>



    <ScrollView style={styles.container} >
    <View style={styles.picker}>
      <Text style={styles.text}>{'Área do Problema:'}</Text>
        <Picker
            style={{ backgroundColor: "#DCDCDC", width: 220, height:25 }}
            selectedValue={escolha}
            onValueChange={value => setEscolha(value) , value => setEscolha(value) 
            }
        >
      
                <Picker.Item label="Saude" value= "Saúde" />
                <Picker.Item label="Transito" value="Trânsito" />
                <Picker.Item label="Ambiental" value="Ambiental" />         
        </Picker>
    </View> 
    <View style={styles.picker}>
            <Text style={styles.text}>{'Nome do Problema:'}</Text>
                <NomeProblema />
    </View>      
                <Text style={styles.text}>{'Descrição do Problema:'}</Text>      
                <View style={styles.textAreaContainer} >
                    <TextInput
                      style={styles.textArea}
                      underlineColorAndroid="transparent"
                      placeholder="Descreva melhor o problema:"
                      placeholderTextColor="grey"
                      numberOfLines={10}
                      multiline={true}
                      value={props.descricao}
                      onChangeText={texto => props.modificaDescricao(texto)}
                    />
                </View>

                <Text style={styles.text}>{'Sugestão para o problema:'}</Text>      
                <View style={styles.textAreaContainer} >
                    <TextInput
                      style={styles.textArea}
                      underlineColorAndroid="transparent"
                      placeholder="Deixe aqui sua sugestão para a solução deste problema: (Opcional)"
                      placeholderTextColor="grey"
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

      <Button  onPress={() => RemoteLocation()} style={{ marginTop:385, marginBottom: 35, backgroundColor: '#8a2be2', justifyContent: 'center'}} >
        <Text >Selecionar uma localização</Text>
      </Button>

      <Button  onPress={() => loadInitialPosition()} style={{ marginTop:385, marginBottom: 35, backgroundColor: '#8a2be2', justifyContent: 'center'}} >
        <Text >Localização atual</Text>
      </Button>
        {remoteLocation ? 
          <Button  onPress={() => cadastrarProblems(props.email, nomeProblema, props.Descricao, escolha, props.latitude, props.longitude, props.sugestao)} style={{ marginTop:385, marginBottom: 35, backgroundColor: '#8a2be2', justifyContent: 'center'}} >
          <Text >Enviar Problema</Text>
        </Button> :

        <Button  onPress={() => cadastrarProblems(props.email, nomeProblema, props.Descricao, escolha, currentRegion.latitude, currentRegion.longitude, props.sugestao)} style={{ marginTop:385, marginBottom: 35, backgroundColor: '#8a2be2', justifyContent: 'center'}} >
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
    backgroundColor: '#DCDCDC'
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    height: 130
  },
  textArea: {
    height: 130,
    width: 300,
    justifyContent: "flex-start",
    textAlignVertical: 'top',
  }
});