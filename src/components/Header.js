import React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header(screen){
  return (
    <View style={styles.header}>
      <MaterialIcons name='arrow-back' size={28} onPress={() => screen()} style={styles.icon} />
      <View>
        <Text style={styles.headerText}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1
  },
  icon:{
    position: 'absolute',
    left: 16
  }
})