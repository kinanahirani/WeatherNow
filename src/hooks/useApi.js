import axios from 'axios';
import {Alert} from 'react-native';

export const useApi = () => {
  const getWeather = async (
    localityId,
    setWeatherData,
    cityName,
    localityName,
  ) => {
    try {
      const response = await axios.get(
        `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data`,
        {
          headers: {
            'x-zomato-api-key': 'be00e3fb30f2b81e56f1522af11c9e3d',
            'Content-Type': 'application/json',
          },
          params: {
            locality_id: localityId,
          },
        },
      );

      const {status, message, locality_weather_data} = response.data;

      if (status === '200' && message === '' && locality_weather_data) {
        setWeatherData({
          weatherData: locality_weather_data,
          cityName,
          localityName,
        });
      } else if (status === '200' && message !== '') {
        Alert.alert(
          'Data temporarily unavailable.',
          'Unable to fetch data at this point in time for this locality.',
        );
      } else if (status === '400') {
        Alert.alert(
          'Invalid locality ID.',
          'Please check the locality ID from the API documentation.',
        );
      } else if (status === '429') {
        Alert.alert(
          'Daily Quota Exceeded',
          'Daily quota for API key exhausted.',
        );
      } else if (status === '500') {
        Alert.alert(
          'Server Error',
          'Something went wrong while fetching data.',
        );
      } else if (status === '403') {
        Alert.alert(
          'Authentication Error',
          'Could not authenticate. Please check your API key.',
        );
      } else {
        Alert.alert('Unknown Error', 'An unknown error occurred.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
      }
      Alert.alert('Error', 'Error fetching weather data.');
    }
  };

  return getWeather;
};
