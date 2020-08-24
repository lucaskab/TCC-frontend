import React, {useState, useEffect} from 'react';
import { Text, FlatList, View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import api from '../../services/api';
import { connect } from 'react-redux';
import Constants from 'expo-constants'

export const CompleteProblem = (props) => {
  const [problems, setProblems] = useState([]);

  async function loadProblem(){
    const id = props._id
    const response = await api.get('/searchProblemByID',{
        params: {
            _id: id
        }
    })
    console.log(response.data);
    setProblems([response.data])
}

useEffect(() => {
  loadProblem();
}, []);

    return (
    <View style={styles.container}>
      <FlatList 
      data={problems}
      style={styles.problemList}
      keyExtractor={problem => String(problem._id)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: problem }) => (
          <View style={styles.problem}>
          <View style={styles.detailsButton}>
          <Text style={styles.problemProperty}>Nome: </Text>

          </View>
          <Text style={styles.problemValue}>{problem.nomeProblema}</Text>

          <Text style={styles.problemProperty}>Area:</Text>
          <Text style={styles.problemValue}>{problem.areaProblema}</Text>

          <Text style={styles.problemProperty}>Descrição:</Text>
          <Text style={styles.problemValue}>{problem.descricaoProblema}</Text>


      </View>
      
      )}
  />
  </View>
    );
}

const mapStateToProps = state =>(
  {
    id: state.ProblemaReducer.IDEscolhido,
  }
  
)

export default connect(mapStateToProps)(CompleteProblem);

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