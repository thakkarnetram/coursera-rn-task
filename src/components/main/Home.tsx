import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStack';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeNavProp;
};
const Home: React.FC<Props> = ({}) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
