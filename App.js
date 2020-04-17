
import React from 'react';
import Routes from './src/Routes';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers'
import { Provider as PaperProvider } from 'react-native-paper';

const App: () => React$Node = () => {
  

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
