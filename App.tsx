import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/components/navigation/RootStack';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'little-lemon.db',
    location: 'default'
  },
  () => console.log('Database open'),
  error => console.error('Could not open database'),
);

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
