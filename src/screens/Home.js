import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import WeatherCard from '../components/WeatherCard';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import {useApi} from '../hooks/useApi';
import {weatherLocations} from '../helpers/weatherLocations';
import _ from 'lodash';

const Home = () => {
  const [city, setCity] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const getWeather = useApi();

  const handleSearch = useCallback(text => {
    setCity(text);
    if (text) {
      const searchTerms = text
        .toLowerCase()
        .split(' ')
        .filter(term => term.trim());
      const filtered = weatherLocations.filter(location =>
        searchTerms.every(
          term =>
            location.cityName.toLowerCase().includes(term) ||
            location.localityName.toLowerCase().includes(term),
        ),
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  }, []);

  useEffect(() => {
    const debouncedSearch = _.debounce(handleSearch, 300);
    debouncedSearch(city);
    return () => {
      debouncedSearch.cancel();
    };
  }, [city, handleSearch]);

  const handleSelectLocation = async location => {
    setSelectedLocation(location);
    setCity('');
    setFilteredLocations([]);
    setWeatherData(null);

    try {
      await getWeather(
        location.localityId,
        setWeatherData,
        location.cityName,
        location.localityName,
      );
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <LinearGradient
      colors={['rgba(46, 51, 90, 1)', '#1c1b33']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <StatusBar backgroundColor={'black'} />
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <View style={styles.searchContainer}>
          <ImageBackground
            source={require('../assets/images/SearchField.png')}
            resizeMode="contain"
            style={styles.imageBackground}>
            <Image
              source={require('../assets/images/search.png')}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Search for a city or area"
              placeholderTextColor="#aaa"
              value={city}
              onChangeText={setCity}
            />
          </ImageBackground>
        </View>
        {filteredLocations.length > 0 && (
          <View style={styles.resultsContainer}>
            <FlatList
              data={filteredLocations}
              keyExtractor={item => item.localityId}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleSelectLocation(item)}
                  style={styles.resultItem}>
                  <Text style={styles.resultText}>
                    🔍 {item.cityName} - {item.localityName}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        <WeatherCard data={weatherData} />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    height: verticalScale(50),
    marginTop: verticalScale(15),
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: horizontalScale(20),
    height: verticalScale(20),
    marginLeft: horizontalScale(10),
    alignSelf: 'center',
  },
  searchBar: {
    color: '#aaa',
    flex: 1,
    marginLeft: horizontalScale(5),
    backgroundColor: 'transparent',
  },
  resultsContainer: {
    backgroundColor: '#1f1d47',
    width: '90%',
    maxHeight: verticalScale(300),
    alignSelf: 'center',
    borderRadius: moderateScale(10),
  },
  resultItem: {
    padding: moderateScale(15),
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  resultText: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
  },
});

export default Home;
