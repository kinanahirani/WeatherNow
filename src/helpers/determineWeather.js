const isDaytime = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  return currentHour >= 7 && currentHour < 18.5;
};

const day = isDaytime();

export const determineWeatherCondition = weatherData => {
  if (!weatherData) {
    return 'unknown';
  }
  const {
    humidity,
    rain_accumulation,
    rain_intensity,
    temperature,
    wind_direction,
    wind_speed,
  } = weatherData;

  // Define conditions for each weather type
  if (rain_intensity > 0.5 && wind_speed < 5) {
    return 'mid rain';
  } else if (wind_speed > 10) {
    return 'fast wind';
  } else if (rain_intensity > 0 && rain_intensity < 0.5) {
    return 'showers';
  } else if (wind_speed > 20 && temperature > 25) {
    return 'tornado';
  } else if (
    humidity > 0.5 &&
    temperature > 20 &&
    temperature < 30 &&
    rain_intensity === 0
  ) {
    return 'partly cloudy';
  } else {
    return 'unknown';
  }
};

export const selectWeatherImage = weatherCondition => {
  switch (weatherCondition) {
    case 'mid rain':
      return require('../assets/images/mid_rain_day.png');
    case 'fast wind':
      return require('../assets/images/fast_wind.png');
    case 'showers':
      return require('../assets/images/mid_rain_day.png');
    case 'tornado':
      return require('../assets/images/tornado.png');
    case 'partly cloudy':
      return require('../assets/images/fast_wind.png');
    default:
      return day
        ? require('../assets/images/default.png')
        : require('../assets/images/default_night.png');
  }
};

export const generateWeatherDescription = weatherData => {
  if (!weatherData) return 'No weather data available.';

  const {
    temperature,
    humidity,
    wind_speed,
    wind_direction,
    rain_intensity,
    rain_accumulation,
  } = weatherData;

  let description = `The current temperature is ${temperature}°C. `;
  description += `Humidity is at ${humidity}%. `;
  description += `The wind is blowing at ${wind_speed} m/s from ${wind_direction}°. `;

  if (rain_intensity > 0) {
    description += `There is rain with an intensity of ${rain_intensity} mm/min. `;
  } else {
    description += `There is no rain. `;
  }

  if (rain_accumulation > 0) {
    description += `The total rain accumulation today is ${rain_accumulation} mm.`;
  }

  return description;
};
