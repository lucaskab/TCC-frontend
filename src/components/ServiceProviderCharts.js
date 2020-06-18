import React, {useState, useCallback} from 'react';
import { ScrollView, View, Text, Platform, Animated, Button } from 'react-native';
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

const ServiceProviderCharts = () => {
  const [problems, setProblems] = useState(0);
  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);

  const handleToggleDatePicker1 = useCallback(() => {
    setShowDatePicker1((state) => !state);
  }, []);

  const handleToggleDatePicker2 = useCallback(() => {
    setShowDatePicker2((state) => !state);
  }, []);

  const handleSearch = useCallback(async () => {
    console.log(selectedDate1,selectedDate2)
    const response = await api.get('searchFilterBetweenDates',{
      params: {
        dataInicio: selectedDate1,
        dataFinal: selectedDate2,
      }
    })
    setProblems(response.data)
  },[]);

  const handleDateChanged1 = useCallback(
    (event,date) => {
      if (Platform.OS === 'android') {
        setShowDatePicker1(false);
      }
      if (date) {
        setSelectedDate1(date);
      }
    },
    [],
  );

  const handleDateChanged2 = useCallback(
    (event,date) => {
      if (Platform.OS === 'android') {
        setShowDatePicker2(false);
      }
      if (date) {
        setSelectedDate2(date);
      }
    },
    [],
  );


  return (
    <Animated.View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
  <Text>
    Bezier Line Chart
  </Text>
  <LineChart
    data={{
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        data: [
          problems
        ]
      }]
    }}
    width={800} // from react-native
    height={220}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</ScrollView>
<TouchableOpacity onPress={handleToggleDatePicker1}>
  <Text>Abrir calendario</Text>
  {showDatePicker1 && (
  <DateTimePicker mode="date" display="calendar" value={selectedDate1} onChange={handleDateChanged1} textColor="#f4ede8"/>
  )}
</TouchableOpacity>

<TouchableOpacity onPress={handleToggleDatePicker2}>
  <Text>Abrir calendario2</Text>
  {showDatePicker2 && (
  <DateTimePicker mode="date" display="calendar" value={selectedDate2} onChange={handleDateChanged2} textColor="#f4ede8"/>
  )}
</TouchableOpacity>
<Button title="Procurar" onPress={handleSearch}/>
</Animated.View>
  )
}

export default ServiceProviderCharts;