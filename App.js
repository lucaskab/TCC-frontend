
import React from 'react';
import Routes from './src/Routes';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {NativeModules} from 'react-native';
import reducers from './src/reducers'
import { Provider as PaperProvider } from 'react-native-paper';
import {YellowBox} from 'react-native';

const App: () => React$Node = () => {
  console.disableYellowBox = true;
  console.reportErrorsAsExceptions = false;

  return (
    <>
    <Provider store={createStore(reducers)}>
    <PaperProvider>
      <Routes />
    </PaperProvider>
    </Provider> 
    
  
  </>
  );
};

export default App;
