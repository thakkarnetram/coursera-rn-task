import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/components/navigation/RootStack';
import {createTable} from './src/components/utils/database';

function App(): JSX.Element {
  useEffect(() => {
    createTable();
  }, []);
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
