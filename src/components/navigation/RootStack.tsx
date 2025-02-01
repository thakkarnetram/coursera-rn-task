import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, ActivityIndicator} from 'react-native';
import OnBoard from '../onBoard/OnBoard';
import Home from '../main/Home';

export type RootStackParamList = {
  OnBoard: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [isNewUser, setNewUser] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRoute = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        setNewUser(hasLaunched !== null);
      } catch (error) {
        console.error('Error checking launch state:', error);
      }
      setLoading(false);
    };
    checkRoute();
  }, []);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <Stack.Navigator>
      {isNewUser ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <Stack.Screen name="OnBoard" component={OnBoard} />
      )}
    </Stack.Navigator>
  );
};
export default RootStack;
