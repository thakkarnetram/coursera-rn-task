import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStack';
import FlatList = Animated.FlatList;
import {fetchData, insertMenuItems} from '../utils/database';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeNavProp;
};
const Home: React.FC<Props> = () => {
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        fetchData(data => {
          if (data.length > 0) {
            setData(data);
          } else {
            fetchFromAPI();
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
    async function fetchFromAPI() {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json',
        );
        const response = await res.json();
        if (res.ok) {
          response.menu.forEach(item => {
            insertMenuItems(item.name, item.description, item.image);
          });

          fetchData(setData); // Refresh state from SQLite
        }
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);

  const filters = ['Starters', 'Mains', 'Drinks', 'Desserts'];

  return (
    <View style={{height: '100%', backgroundColor: '#f4e7d2'}}>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Little Lemon Resto</Text>
          <Text style={styles.desc}>
            Family owned restaurant {'\n'}Traditional dishes with a modern twist
          </Text>
        </View>
        <Image
          source={{
            uri: 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/greekSalad.jpg?raw=true',
          }}
          style={styles.imageHome}
        />
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterHead}>Order Now</Text>
        <View style={styles.filterButtons}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.activeFilter,
              ]}
              onPress={() => setSelectedFilter(filter)}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.activeFilterText,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.foodContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.foodHeader}>{item.name}</Text>
              <Text style={styles.foodDescription} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
            <Image
              source={{
                uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
              }}
              style={styles.foodImage}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#003b18',
    width: '100%',
    height: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  textContainer: {
    flex: 1,
  },
  headerText: {
    color: '#fcd200',
    fontSize: 26,
  },
  desc: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 10,
  },
  imageHome: {
    width: 150,
    height: 100,
    borderRadius: 15,
  },
  filterContainer: {
    width: '100%',
    height: '15%',
    backgroundColor: '#fffdf5',
    padding: 15,
  },
  filterHead: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  filterButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: '#dcdcdc',
    marginTop: 10,
  },
  activeFilter: {
    backgroundColor: '#003b18',
  },
  filterText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeFilterText: {
    color: 'white',
  },
  foodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  foodHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  foodDescription: {
    fontSize: 12,
    color: '#4F4F4F',
    marginTop: 5,
    flexShrink: 1,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default Home;
