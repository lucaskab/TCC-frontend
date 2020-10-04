import React, {useState, useCallback, useEffect} from 'react';
import { ScrollView, View, Text, Platform, Animated, Button, Dimensions } from 'react-native';
import {getMonth} from 'date-fns';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api';
import { connect } from 'react-redux';
import { Appbar } from 'react-native-paper';

const ServiceProviderCharts = (props) => {
  const [problems, setProblems] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const [allProblems, setAllProblems] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);
  const [user, setUser] = useState({});

  const handleToggleDatePicker1 = useCallback(() => {
    setShowDatePicker1((state) => !state);
  }, []);

  const handleToggleDatePicker2 = useCallback(() => {
    setShowDatePicker2((state) => !state);
  }, []);

  useEffect(() => {
    const email = props.email;
    const senha = props.senha;
    api.post('userscadastrados', {email, senha}).then(response => {
      setUser(response.data);
    })} , []);

  const handleSearch = useCallback(async () => {
    const response = await api.get('/searchAllProblems');
    const filter = response.data;
    var dateArray = [];
    var finalArray = [0,0,0,0,0,0,0,0,0,0,0,0];
    const problema = filter.filter(problem => problem.areaProblema === `${user.prestador}`).map(problem => {
      dateArray.push(problem.CreatedAt);
    });
    for(var i=0; i<dateArray.length; i++) {
      var year = dateArray[i].slice(0,4);
      var month = dateArray[i].slice(5,7);
      var day = dateArray[i].slice(8,10);
      var date = getMonth(new Date(year,month,day));
      finalArray[date-1] += 1;
    }
    setProblems(finalArray);
  },[problems]);

  const handleSearchAll = useCallback(async () => {
    const response1 = await api.get('/searchAllProblems');
    const filter1 = response1.data;
    var dateArray1 = [];
    var finalArray1 = [0,0,0,0,0,0,0,0,0,0,0,0];
    filter1.map(problem => {
      dateArray1.push(problem.CreatedAt);
    });
    for(var i=0; i<dateArray1.length; i++) {
      var year = dateArray1[i].slice(0,4);
      var month = dateArray1[i].slice(5,7);
      var day = dateArray1[i].slice(8,10);
      var date = getMonth(new Date(year,month,day));
      finalArray1[date-1] += 1;
    }
    setAllProblems(finalArray1);
  },[allProblems]);

  function handleCharts() {
    handleSearchAll();
    handleSearch();
  }

  
  return (
    <Animated.View>
      <Appbar.Header SafeAreaView={0} statusBarHeight={20} style={{backgroundColor: '#8a2be2'}}>
      <Appbar.Action />
        <Appbar.Content title="Informações" />
        <Appbar.Action icon="arrow-right" onPress={handleCharts} />
      </Appbar.Header>
      <ScrollView>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: "bold", color:'#8a2be2', marginTop: 30, textAlign:'center',}}>
        Quantidade de problemas de {user.prestador} em 2020 
      </Text>
      </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{margin: 10}} >


  <LineChart
    data={{
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [{
        data: problems        
        }]
    }}
    width={750} // from react-native
    height={220}
    chartConfig={{
      backgroundGradientFrom: '#8a2be2',
      backgroundGradientTo: '#8a2be2',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
        
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
    }}
  />

</ScrollView>
  <Text style={{fontSize: 20, fontWeight: "bold", color:'#8a2be2', alignSelf: 'center'}}>Quantidade de problemas em 2020 </Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{margin: 10}} >


  <LineChart
    data={{
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [{ data: allProblems}]
    }}
    width={750} // from react-native
    height={220}
    chartConfig={{
      backgroundGradientFrom: '#8a2be2',
      backgroundGradientTo: '#8a2be2',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />

</ScrollView>
<View style={{marginBottom: 90, width: "100%", justifyContent: 'center', flexDirection:'row'}}>
</View>
</ScrollView>
</Animated.View>
  )
}

const mapStateToProps = state =>(
  {
    email: state.AutenticacaoReducer.emailLogin,
    senha: state.AutenticacaoReducer.senhaLogin,
  }
);

export default connect(mapStateToProps)(ServiceProviderCharts);