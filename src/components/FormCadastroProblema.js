import React, {useState, useEffect, useFocusEffect, useCallback} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {modificaFoto1, modificaFoto2, modificaFoto3, modificaFoto4, modificaFoto5} from '../actions/ProblemaActions';
import {modificaPhotoURI} from '../actions/CameraActions';
import { Appbar, ActivityIndicator, Colors } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import FitImage from 'react-native-fit-image';

import Lightbox from 'react-native-lightbox';





export const FormCadastroProblema = (props) => {
  const [Imagem, setImagem] = useState([], []);
  const [Counter, setCounter] = useState(1);
  const [activityStatus,setActivityStatus] = useState(false)
  const [Icone,setIcone] = useState([], []);
  const [button1,setButton1] = useState(true)
  const [button2,setButton2] = useState(true)
  const [button3,setButton3] = useState(true)
  const [button4,setButton4] = useState(true)
  const [button5,setButton5] = useState(true)
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);



  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [Imagem,button1,button2,button3,button4,button5]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a câmera</Text>;
  }

  const RemovePicture = (e) =>{

    let uri = e;
    let a = Counter -1;
    setImagem(Imagem.filter((e)=>(e !== uri)))
    if(a == 1){
      setButton1(true)
    }
    else if(a == 2){
      setButton2(true);
    }
    else if(a == 3){
      setButton3(true);
    }
    else if(a == 4){
      setButton4(true);
    }
    else if(a == 5){
      setButton5(true);
    }
    setCounter(Counter - 1);
    };

  async function snap(){
    
    setCounter(
      Counter +1
    )
    if(Counter >= 6 ){
      Actions.enviarProblema();
    }
    
    else if (Counter < 6) {
      setActivityStatus(true);
      let photo = await this.camera.takePictureAsync()
      let uri = photo.uri;
      
      if(Counter == 1){
        props.modificaFoto1(uri);
        setButton1(false);
      }
        
      else if(Counter == 2){
        props.modificaFoto2(uri);
        setButton2(false);
      }
        

      else if(Counter == 3){
        props.modificaFoto3(uri);
        setButton3(false);
      }
        

      else if(Counter == 4){
        props.modificaFoto4(uri);
        setButton4(false);
      }
       

      else if(Counter == 5){
        props.modificaFoto5(uri);
        setButton5(false);
      }
      setIcone(
        [...Icone,"X"]
      )
      setImagem(
        [...Imagem,uri]
     )
     setActivityStatus(false)
      
    }
    
  }


  async function openImagePickerAsync() {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Requirida a permissão para utilização da câmera!");
      return;
    }
    if(permissionResult.granted) {
  
    if(Counter >= 6 ){
      Actions.enviarProblema();
    }
    
    else if(Counter <= 5){
      const  retorno  = await ImagePicker.launchImageLibraryAsync();
      const uri = retorno.uri;
      
      if(uri === undefined){
        return 0
      }
     else if(Counter == 1 && uri !== undefined){
        props.modificaFoto1(uri);
        setButton1(false);
        setCounter(
          Counter +1
        )
      }
        
      else if(Counter == 2 && uri !== undefined){
        props.modificaFoto2(uri);
        setButton2(false);
        setCounter(
          Counter +1
        )
      }
        
      else if(Counter == 3 && uri !== undefined){
        props.modificaFoto3(uri);
        setButton3(false);
        setCounter(
          Counter +1
        )
      }
        
      else if(Counter == 4 && uri !== undefined){
        props.modificaFoto4(uri);
        setButton4(false);
        setCounter(
          Counter +1
        )
      }
       
      else if(Counter == 5 && uri !== undefined){
        props.modificaFoto5(uri);
        setButton5(false);
        setCounter(
          Counter +1
        )
      }
      
      setImagem(
        [...Imagem,uri]
      )

    }     
 }}

  function setar(uri){
    props.modificaPhotoURI(uri);
    Actions.fotos();
  }

  return (
    <>

        <Appbar.Header SafeAreaView={0} statusBarHeight={20} style={{backgroundColor: '#8a2be2'}}>
        <Appbar.BackAction onPress={() => Actions.navigation()} />  
        <Appbar.Content title="" />
        <Appbar.Action icon="camera-control" onPress={()  => openImagePickerAsync()} />
        {activityStatus ? <ActivityIndicator animating={activityStatus} color={Colors.red800} />  : 
        <Appbar.Action icon="camera" onPress={()  => snap()} />}
        </Appbar.Header> 



  <Camera style={{ flex: 1 }} type={type} ref={ref => { this.camera = ref; }}  >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>

        </View>

    <View style={{ height: 100, flexDirection: 'row'}}>
    <TouchableOpacity  onPress={() => setar(Imagem[0])} style={styles.loadButton}>
      <Image source={{ uri: Imagem[0] }} style={{ width: 60, height: 60}}  resizeMode={'stretch'}/>
      </TouchableOpacity>   
    <TouchableOpacity  onPress={()=> setar(Imagem[1])} style={styles.loadButton}>
      <Image source={{ uri: Imagem[1] }} style={{ width: 60, height: 60}} resizeMode={'stretch'} />
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=> setar(Imagem[2])} style={styles.loadButton}>
      <Image source={{ uri: Imagem[2]  }} style={{ width: 60, height: 60}} resizeMode={'stretch'} />
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=> setar(Imagem[3])} style={styles.loadButton}>
      <Image source={{ uri: Imagem[3]  }} style={{ width: 60, height: 60}} resizeMode={'stretch'} />
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=> setar(Imagem[4])} style={styles.loadButton}>
      <Image source={{ uri: Imagem[4]  }} style={{ width: 60, height: 60}} resizeMode={'stretch'} />
      </TouchableOpacity>
    
      
      </View>
      <View style={{position: 'absolute',flexDirection: 'row', paddingRight: 10, bottom: 10,left:25}}>
      <Button onPress={()=> RemovePicture(Imagem[0])} title="X" buttonStyle={{width:30,height:30,marginRight:35, backgroundColor:'#8a2be2'}} disabled={button1} disabledStyle={{width:30,height:30,backgroundColor:'transparent'}} disabledTitleStyle={{color:'transparent'}}/>
      <Button onPress={()=> RemovePicture(Imagem[1])} title="X" buttonStyle={{width:30,height:30,marginRight:35, backgroundColor:'#8a2be2'}} disabled={button2} disabledStyle={{width:30,height:30,backgroundColor:'transparent'}} disabledTitleStyle={{color:'transparent'}}/>
      <Button onPress={()=> RemovePicture(Imagem[2])} title="X" buttonStyle={{width:30,height:30,marginRight:35, backgroundColor:'#8a2be2'}} disabled={button3} disabledStyle={{width:30,height:30,backgroundColor:'transparent'}} disabledTitleStyle={{color:'transparent'}}/>
      <Button onPress={()=> RemovePicture(Imagem[3])} title="X" buttonStyle={{width:30,height:30,marginRight:35, backgroundColor:'#8a2be2'}} disabled={button4} disabledStyle={{width:30,height:30,backgroundColor:'transparent'}} disabledTitleStyle={{color:'transparent'}}/>
      <Button onPress={()=> RemovePicture(Imagem[4])} title="X" buttonStyle={{width:30,height:30,marginRight:35, backgroundColor:'#8a2be2'}} disabled={button5} disabledStyle={{width:30,height:30,backgroundColor:'transparent'}} disabledTitleStyle={{color:'transparent'}}/>
      </View>
      </Camera>
  

    </>
  );
};

const mapStateToProps = state =>(
  {
    email: state.AutenticacaoReducer.emailLogin,
    foto: state.CameraReducer.photoURI,
    foto1: state.ProblemaReducer.Foto1,
    foto2: state.ProblemaReducer.Foto2,
    foto3: state.ProblemaReducer.Foto3,
    foto4: state.ProblemaReducer.Foto4,
    foto5: state.ProblemaReducer.Foto5,
  }

)

export default   connect(mapStateToProps, {modificaFoto1, modificaFoto2, modificaFoto3, modificaFoto4, modificaFoto5, modificaPhotoURI})(FormCadastroProblema);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  loadButton: {
    width: 50,
    height: 50,
    marginLeft: 15
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});