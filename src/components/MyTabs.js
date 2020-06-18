import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ServiceProviderMain from './ServiceProviderMain';
import ServiceProviderData from './ServiceProviderData';
import ServiceProviderCharts from './ServiceProviderCharts';
import Ionicons from 'react-native-vector-icons/Ionicons';



const MyTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Problemas') {
              iconName = focused
                ? 'ios-list-box' 
                : 'ios-list';
            } else if (route.name === 'Atuais') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#8a2be2',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Problemas" component={ServiceProviderMain} />
        <Tab.Screen name="Atuais" component={ServiceProviderData} />
        <Tab.Screen name="Gráficos" component={ServiceProviderCharts} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;