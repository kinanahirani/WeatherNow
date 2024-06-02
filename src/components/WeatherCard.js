import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';
import {
  determineWeatherCondition,
  generateWeatherDescription,
  selectWeatherImage,
} from '../helpers/determineWeather';

const WeatherCard = ({data}) => {
  const weatherCondition = determineWeatherCondition(data);
  const weatherImage = selectWeatherImage(weatherCondition);

  if (!data?.weatherData) {
    return (
      <View
        style={{
          marginTop: verticalScale(30),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: moderateScale(20), fontWeight: '500'}}>
          Please choose the location!
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.shadowContainer}>
      <ImageBackground
        source={require('../assets/images/card.png')}
        resizeMode="contain"
        style={styles.imageBackground}>
        <View style={styles.contentContainer}>
          <View
            style={{
              alignSelf: 'center',
              marginLeft: horizontalScale(20),
              marginTop: verticalScale(15),
            }}>
            <Text style={styles.temperature}>
              {data?.weatherData?.temperature !== null
                ? data.weatherData.temperature
                : '-'}
              °
            </Text>
            <Text style={styles.highLow}>
              Humidity:{' '}
              {data?.weatherData?.humidity !== null
                ? data.weatherData.humidity
                : '-'}
              %
            </Text>
            <Text style={styles.highLow}>
              Wind Speed:{' '}
              {data?.weatherData?.wind_speed !== null
                ? data.weatherData.wind_speed
                : '-'}{' '}
              km/h
            </Text>
            <Text style={styles.highLow}>
              Rain:{' '}
              {data?.weatherData?.rain_intensity !== null
                ? data.weatherData.rain_intensity
                : '-'}{' '}
              mm/min
            </Text>
            <Text style={styles.location}>
              {data?.cityName ? data.cityName : '-'},{' '}
              {data?.localityName ? data.localityName : '-'}
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={weatherImage}
              resizeMode="contain"
              style={styles.weatherImage}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    marginTop: verticalScale(30),
  },
  imageBackground: {
    height: verticalScale(190),
    alignSelf: 'center',
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '95%',
    alignSelf: 'center',
  },
  temperature: {
    fontSize: moderateScale(55),
    color: '#FFFFFF',
    marginBottom: verticalScale(5),
  },
  highLow: {
    color: '#e0d9ff',
  },
  location: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  imageContainer: {
    width: horizontalScale(160),
    height: verticalScale(160),
    alignSelf: 'flex-end',
  },
  weatherImage: {
    width: horizontalScale(160),
    height: verticalScale(160),
  },
});

export default WeatherCard;
