import React, {useState, useEffect} from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import api from '../../services/api';
import Constants from 'expo-constants';
import parseISO from 'date-fns/parseISO';
import pt from 'date-fns/locale/pt';
import {format, subMonths} from 'date-fns';

export const ProblemInfo = (props) => {
  const [problem, setProblem] = useState({});
  const [statusProblem, setStatusProblem] = useState('');
  const [date, setDate] = useState('');

  async function loadProblem(){
    const id = props.data
    console.log(id);
    const response = await api.get('/searchProblemByID',{
        params: {
            _id: id
        }
    })
    console.log(response.data);
    setProblem(response.data)
    setStatusProblem(response.data.status);
    const parsedDate = parseISO(response.data.CreatedAt);
    console.log(parsedDate);
    const formattedDate = format(parsedDate, "dd'/'MMMM'/'yyyy 'hora:' kk ':' mm ':' ss", {locale: pt} );
    console.log(formattedDate);
    setDate(formattedDate);
    
}
useEffect(() => {
  loadProblem();
}, []);

    return (
      <View style={styles.container}>
      <View>
          <Text>{problem.areaProblema}</Text>
          <Text>{problem.nomeProblema}</Text>
          <Text>{problem.descricaoProblema}</Text>
          <Text>{problem.sugestao}</Text>
          <Text>{problem.status}</Text>
          <Text>{problem.email}</Text>
          <Text>{date}</Text>
      </View>
</View>
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
      marginTop: 40,
      color: '#13131a',
      fontWeight: 'bold'
  },
  description: {
      fontSize: 16,
      lineHeight: 24,
      color: '#737380',
  },
  changeData: {
      fontSize: 16,
      lineHeight: 24,
      color: '#8a2be2',
      textDecorationLine: 'underline',
      marginBottom: 10
  },
  problemList: {
      marginTop: 25
  },
  problem: {
      padding: 24,
      borderRadius: 8,
      backgroundColor: '#FFF',
      marginBottom: 16
  },
  problemProperty: {
      fontSize: 14,
      color:'#41414d',
      fontWeight: 'bold'
  },
  problemValue: {
      marginTop: 8,
      fontSize: 15,
      marginBottom: 24,
      color: '#737380'
  },
  detailsButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  detailsButtonText: {
      color: '#8a2be2',
      fontSize: 15,
      fontWeight: 'bold',
  },
  modalView: {
      backgroundColor: '#rgb(235,233,227)',
      borderRadius: 15,
      width: 275,
      borderColor: 'white',
      borderWidth: 0.7,
    }
}); 