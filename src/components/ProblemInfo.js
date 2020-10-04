import React, {useState, useEffect, useCallback} from 'react';
import { Text, FlatList, View, StyleSheet, Image,Alert, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import api from '../../services/api';
import Constants from 'expo-constants';
import parseISO from 'date-fns/parseISO';
import pt from 'date-fns/locale/pt';
import {format, subMonths} from 'date-fns';
import { requestPermissionsAsync, reverseGeocodeAsync } from 'expo-location';
import { Actions } from "react-native-router-flux";
import { Appbar } from 'react-native-paper';

export const ProblemInfo = (props) => {
  const [problem, setProblem] = useState({});
  const [photoName, setPhotoName] = useState([]);
  const [statusProblem, setStatusProblem] = useState('');
  const [date, setDate] = useState('');
  const [changeStatus, setChangeStatus] = useState(props.flag);
  const [coordinates, setCoordinates] = useState({latitude:"",longitude:""});
  const [address, setAddress] = useState({rua:"",numero:"",cidade:"",estado:"",pais:""});

  function handleCircleColor(status) {
    if(status === "Avaliando") {
      return {
        width: 15,
        height: 15,
        borderRadius: 15/2,
        backgroundColor: 'red',
        marginLeft: 10
      }
    }
    else if(status === "Andamento") {
      return {
        width: 15,
        height: 15,
        borderRadius: 15/2,
        backgroundColor: 'yellow',
        marginLeft: 10
      }
    }
    else {
      return {
        width: 15,
        height: 15,
        borderRadius: 15/2,
        backgroundColor: 'green',
        marginLeft: 10
      }
    }
  }

  async function loadProblem(){
    const {problemId} = props;
    const response = await api.get('/searchProblemByID',{
        params: {
            _id: problemId
        }
    })
    setProblem(response.data)
    setStatusProblem(response.data.status);
    setPhotoName(response.data.urlFoto);
    const parsedDate = parseISO(response.data.CreatedAt);
    const formattedDate = format(parsedDate, "dd' de 'MMMM' de 'yyyy 'às' kk':'mm':'ss", {locale: pt} );
    setDate(formattedDate);
    const place = {latitude:response.data.posicao.coordinates[1],
      longitude:response.data.posicao.coordinates[0]};
    const cidade =  await reverseGeocodeAsync(place);
    const getCity = await api.get(`https://viacep.com.br/ws/${cidade[0].postalCode}/json/`);
    setAddress({
      rua: cidade[0].street,
      numero: cidade[0].name,
      cidade: getCity.data.localidade,
      estado: getCity.data.uf,
      pais: cidade[0].isoCountryCode
    });
}
useEffect(() => {
  loadProblem();
}, []);

const changeProblemStatus = useCallback(async(status) => {
    await api.post('/changeProblemStatus', {
        status,
        problemId: props.problemId,
    });
    if(status === "Andamento") {
        setStatusProblem("Andamento");
        Alert.alert("Sucesso","Status atualizado com sucesso!!!");
        Actions.tab()
    } else if( status === "Finalizado") {
        setStatusProblem("Finalizado");
        await api.post('/changeIdPrestador', {id: problemId}); 
        Alert.alert("Sucesso","Status atualizado com sucesso!!!");
        Actions.tab();
    }
    else if( status === "Avaliando") {
      setStatusProblem("Avaliando");
      Alert.alert("Sucesso","Status atualizado com sucesso!!!");
      Actions.tab();
  }
    
}, []);

    return (
      <>
      <Appbar.Header SafeAreaView={0} statusBarHeight={20} style={{backgroundColor: '#8a2be2'}}>
      <Appbar.Action icon="arrow-left" onPress={()=> Actions.perfil()} />
        <Appbar.Content title="Informações" />
      </Appbar.Header>

      <ScrollView style={styles.container}>
          <View>
              <Text style={styles.title}>Informação completa</Text>
          </View>
      <View>
          <View style={styles.borda}>
          <Text style={styles.description}>Área:</Text>
          <Text style={styles.info}>{problem.areaProblema}</Text>
          </View>
          <View style={styles.borda}>
          <Text style={styles.description}>Nome:</Text>
          <Text style={styles.info}>{problem.nomeProblema}</Text>
          </View>
          <View style={styles.borda}>
          <Text style={styles.description}>Endereço:</Text>
          <Text style={styles.info}>{address.rua}, {address.numero}, {address.cidade}, {address.estado}, {address.pais}</Text>
          </View>
          <View style={styles.borda}>
          <Text style={styles.description}>Descrição:</Text>
          <Text style={styles.info}>{problem.descricaoProblema}</Text>
          </View>
          <View style={styles.borda}>
          <Text style={styles.description}>Sugestão:</Text>
          <Text style={styles.info}>{problem.sugestao}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center',   borderRadius: 8,borderColor:'#8a2be2',borderWidth: 3}}>
            <Text style={styles.description}> Status:</Text>
            <Text style={styles.info1}>  {statusProblem}</Text>
            <View style={handleCircleColor(statusProblem)}></View>
          </View>
          <View style={styles.borda}>
          <Text style={styles.description}>Criado por:</Text>
          <Text style={styles.info}>{problem.email}</Text>
          </View>
          <View style={styles.borda}>
          <Text style={styles.description}>Criado em:</Text>
          <Text style={styles.info}>{date}</Text>
          </View>
      </View>
        {changeStatus === 1 ?      
         <View style={styles.borda}>
            <Text style={styles.description}>
              Alterar status para:
            </Text>
            <View style={{flexDirection: 'row', justifyContent:"space-around"}}>
            <TouchableOpacity  onPress={() => changeProblemStatus("Avaliando")}>
                  <View style={{flex: 0.5, borderRadius: 10, padding: 10, backgroundColor: "white",borderWidth: 3, borderColor: '#8a2be2', marginTop: 10}}>
                    <Text>Avaliando</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => changeProblemStatus("Andamento")}>
                  <View style={{flex: 0.5, borderRadius: 10, padding: 10, backgroundColor: "white",borderWidth: 3, borderColor: '#8a2be2', marginTop: 10}}>
                    <Text>Andamento</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeProblemStatus("Finalizado")}>
                  <View style={{flex: 0.5, borderRadius: 10, padding: 10, backgroundColor: "white",borderWidth: 3, borderColor: '#8a2be2', marginTop: 10}}>
                    <Text>Finalizado</Text>
                  </View>
              </TouchableOpacity>
            </View> 
        </View>
        : null        
        }
         <ScrollView style={{backgroundColor: "#DCDCDC",flexDirection: 'row', marginTop: 30, marginBottom: 80, borderRadius: 8,borderColor:'#8a2be2',borderWidth: 5, paddingleft: 15, paddingRight: 15}} horizontal={true} showsHorizontalScrollIndicator={false} >
          {photoName.map(uri => (
            <TouchableOpacity onPress={()=> Actions.fullPicture({uri})}>
              <Image resizeMode="contain" style={{width: 100, height: 100, marginRight: 10}} source={{uri: `https://dc4a7874d0f7.ngrok.io/files/${uri}`}}></Image> 
            </TouchableOpacity>
          ))} 
          </ScrollView> 
               
      </ScrollView>
      </>
    );
}


export default ProblemInfo;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: Constants.statusBarHeight + 20
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  headerText: {
      fontSize: 15,
      color: '#737380'
  },
  headerTextBold:{
      fontWeight: 'bold',
      color: '#8a2be2',
      fontSize: 20
  },
  title: {
      fontSize: 30,
      marginBottom: 16,
      color: '#8a2be2',
      fontWeight: 'bold'
  },
  description: {
      fontSize: 16,
      lineHeight: 24,
      color: '#8a2be2',
  },
info: {
  fontSize: 14,
  color:'black',
  marginRight: 20,
  marginBottom: 10
},
info1: {
  fontSize: 14,
  color:'black',
  marginRight: 20,
  marginBottom: 10,
  marginTop: 10,
},
borda: {
  borderRadius: 8,
  borderColor:'#8a2be2',
  borderWidth: 3,
  marginVertical: 7,
  padding: 5
}
}); 