import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../helpers/sizeHelpers';

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.title}>WeatherNow</Text>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: moderateScale(10),
    height: verticalScale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: moderateScale(28),
  },
});
