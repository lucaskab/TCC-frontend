import React, {useEffect} from 'react';
import { Text, View, Image, BackHandler, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

export const Foto =(props)=>{

     
    return (
      <View style={{flex: 1, backgroundColor:'black', justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={()=> Actions.formCadastroProblema()}>
      <Text style={{color:'red'}} >AAAAAAAAAAAAAAAA</Text>
      <Text style={{color:'red'}}>AAAAAAAAAAAAAAAA</Text>
      <Text style={{color:'red'}}>AAAAAAAAAAAAAAAA</Text>
      <Text style={{color:'red'}}>AAAAAAAAAAAAAAAA</Text>
      </TouchableOpacity>
      <Image
        style={{ height: 500 , width: '100%'}}
        source={{ uri: props.foto }}
      />
    </View>
    )
}

const mapStateToProps = state =>(
  {
    foto: state.CameraReducer.photoURI
  }

)

export default   connect(mapStateToProps)(Foto);