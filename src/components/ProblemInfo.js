import React, {useState, useEffect, useCallback} from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, ScrollView} from 'react-native';
import api from '../../services/api';
import Constants from 'expo-constants';
import parseISO from 'date-fns/parseISO';
import pt from 'date-fns/locale/pt';
import {format, subMonths} from 'date-fns';

export const ProblemInfo = (props) => {
  const [problem, setProblem] = useState({});
  const [statusProblem, setStatusProblem] = useState('');
  const [date, setDate] = useState('');
  const [changeStatus, setChangeStatus] = useState(props.flag);

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
    const parsedDate = parseISO(response.data.CreatedAt);
    const formattedDate = format(parsedDate, "dd' de 'MMMM' de 'yyyy 'às' kk ':' mm ':' ss", {locale: pt} );
    setDate(formattedDate);
    
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
        setStatusProblem("Andamento")
    } else if( status === "Finalizado") {
        setStatusProblem("Finalizado");
    }
    
}, []);

    return (
      <View style={styles.container}>
          <View>
              <Text style={styles.title}>Informação completa</Text>
          </View>
      <View>
          <Text style={styles.description}>Área:</Text>
          <Text style={styles.info}>{problem.areaProblema}</Text>
          <Text style={styles.description}>Nome:</Text>
          <Text style={styles.info}>{problem.nomeProblema}</Text>
          <Text style={styles.description}>Descrição:</Text>
          <Text style={styles.info}>{problem.descricaoProblema}</Text>
          <Text style={styles.description}>Sugestão:</Text>
          <Text style={styles.info}>{problem.sugestao}</Text>
          <Text style={styles.description}>Status:</Text>
          <Text style={styles.info}>{statusProblem}</Text>
          <View style={handleCircleColor(statusProblem)}></View>
          <Text style={styles.description}>Criado por:</Text>
          <Text style={styles.info}>{problem.email}</Text>
          <Text style={styles.description}>Criado em:</Text>
          <Text style={styles.info}>{date}</Text>
      </View>
        {changeStatus === 1 ?      
         <View>
         <Text>
          Alterar para:
        </Text>
        <TouchableOpacity onPress={() => changeProblemStatus("Andamento")}>
            <Text>Andamento</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeProblemStatus("Finalizado")}>
            <Text>Finalizado</Text>
        </TouchableOpacity> 
        </View>
        : null        
        }
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
      color: '#8a2be2',
  },
info: {
  fontSize: 14,
  color:'black',
  marginRight: 20
},
}); 