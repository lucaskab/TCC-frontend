import React, {useEffect} from 'react';
import { View, Image, BackHandler, TouchableOpacity} from 'react-native';

import { Actions } from 'react-native-router-flux';

const FullPicture = (props) => { 

return (
  <View style={{flex: 1, backgroundColor:'black', justifyContent: 'center', alignItems: 'center'}}>
  <TouchableOpacity onPress={()=> Actions.problemInfo()}>
  </TouchableOpacity>
  <Image
    style={{ height: 500 , width: '100%'}}
    source={{uri: `https://9720c12ec8d7.ngrok.io/files/${props.uri}` }}
    resizeMode="contain"
  />
</View>
)}
export default FullPicture;
