import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

type Props = {
  navigation: ProfileProp;
};

const Profile: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');

  useEffect(() => {
    AsyncStorage.getItem('name').then(nameFromData => setName(nameFromData));
    AsyncStorage.getItem('email').then(emailFromData =>
      setEmail(emailFromData),
    );
  });
  const logout = async () => {
    await AsyncStorage.removeItem('email');
    navigation.navigate('OnBoard');
  };
  return (
    <View style={{height: '100%', backgroundColor: '#f4e7d2'}}>
      <View>
        <Text style={styles.header}>Personal Information</Text>
      </View>
      <View>
        <Image
          style={styles.avatar}
          source={require('../../../assets/Profile.png')}
        />
      </View>
      <View>
        <Text style={styles.label}>First Name : {name}</Text>
        <Text style={styles.label}>Email : {email}</Text>
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    margin: 30,
    textAlign: 'left',
    color: 'black',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginLeft: 25,
    marginTop: 5,
  },
  label: {
    fontSize: 20,
    marginLeft: 30,
    color: 'black',
    marginTop: 25,
  },
  buttonStyle: {
    width: 150,
    height: 40,
    backgroundColor: '#dc8f00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
  },
  logoutContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
});

export default Profile;
