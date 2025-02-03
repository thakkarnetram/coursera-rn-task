import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OnBoardProp = NativeStackNavigationProp<RootStackParamList, 'OnBoard'>;

type Props = {
  navigation: OnBoardProp;
};

const OnBoard: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleName = (name: string) => {
    setName(name);
  };

  const handleEmail = (email: string) => {
    setEmail(email);
  };

  const handleOnSubmit = async () => {
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('email', email);
    if (name && email) {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>Let us get to know you</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#000000"
            value={name}
            onChangeText={handleName}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType={'email-address'}
            placeholderTextColor="#000000"
            value={email}
            onChangeText={handleEmail}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleOnSubmit();
          }}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f7f9',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Center the content vertically
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
    color: 'black',
  },
  form: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    borderColor: '#2c3e50',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    color: '#000000',
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#C4CCD6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#576574',
    fontWeight: 'bold',
  },
});

export default OnBoard;
