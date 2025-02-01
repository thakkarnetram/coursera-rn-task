import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStack';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeNavProp;
};
const Home: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{height: '100%', backgroundColor: '#f4e7d2'}}>
      <Image
        style={styles.logoImage}
        source={require('../../../assets/Logo.png')}
      />
      <View>
        <Image
          style={styles.image}
          source={require('../../../assets/Bruschetta.png')}
        />
        <Text
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileLink}>
          View Profile
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: 400,
    height: 60,
    marginTop: '10%',
    resizeMode: 'contain',
  },
  image: {
    width: '80%',
    height: '40%',
    margin: '10%',
  },
  profileLink: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
  },
});

export default Home;
