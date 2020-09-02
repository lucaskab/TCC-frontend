import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ServiceProviderMain from './ServiceProviderMain';
import ServiceProviderData from './ServiceProviderData';
import ServiceProviderCharts from './ServiceProviderCharts';
import ServiceProviderMap from './ServiceProviderMap';
import { Feather } from '@expo/vector-icons'



const MyTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Problemas') {
              iconName = "list";
            } else if (route.name === 'Atuais') {
              iconName = "check";
            }
            else if (route.name === 'Mapa') {
              iconName = "map";
            }
            else if (route.name === 'Gráficos') {
              iconName = "bar-chart-2";
            }

            // You can return any component that you like here!
            return <Feather name={iconName} size={20} color="black" />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'black',
          activeBackgroundColor: '#8a2be2',
          inactiveBackgroundColor: 'white',
        }}
      >
        <Tab.Screen name="Mapa" component={ServiceProviderMap} />
        <Tab.Screen name="Problemas" component={ServiceProviderMain} />
        <Tab.Screen name="Atuais" component={ServiceProviderData} />
        <Tab.Screen name="Gráficos" component={ServiceProviderCharts} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;