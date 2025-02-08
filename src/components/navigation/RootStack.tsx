import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import OnBoard from '../onBoard/OnBoard';
import Home from '../main/Home';
import Profile from '../main/Profile';
import {useNavigation} from '@react-navigation/native';

export type RootStackParamList = {
  OnBoard: undefined;
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [isNewUser, setNewUser] = useState<boolean | null>(null);
  const navigation = useNavigation();
  useEffect(() => {
    const checkRoute = async () => {
      try {
        const hasData = await AsyncStorage.getItem('email');
        setNewUser(hasData !== null);
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
  const navigateToProfile = () => {
    // @ts-ignore
    navigation.navigate('Profile');
  };
  return (
    <Stack.Navigator>
      {isNewUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => (
                <TouchableOpacity onPress={navigateToProfile}>
                  <Image
                    source={require('../../../assets/Profile.png')} // Replace with your image path
                    style={{width: 300, height: 40, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              ),
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerTitle: () => (
                <Image
                  source={require('../../../assets/Logo.png')} // Replace with your image path
                  style={{width: 300, height: 40, resizeMode: 'contain'}}
                />
              ),
              headerTitleAlign: 'center',
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="OnBoard"
            component={OnBoard}
            options={{
              headerTitle: () => (
                <Image
                  source={require('../../../assets/Logo.png')} // Replace with your image path
                  style={{width: 400, height: 50, resizeMode: 'contain'}}
                />
              ),
              headerTitleAlign: 'center',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
export default RootStack;
