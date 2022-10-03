import {View, Text, useWindowDimensions, Image, StyleSheet} from 'react-native';
import React from 'react';
import Logo from '../../../assets/images/Logo.png';
import {Auth} from 'aws-amplify';

const CustomNav = () => {
  const {height} = useWindowDimensions();

  const signOut = () => {
    Auth.signOut();
  };

  return (
    <View style={styles.nav}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Каналсервис</Text>
      <Text onPress={signOut} style={styles.logout}>
        Sign out
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#d4a14e',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
  },
  logo: {
    width: '20%',
    maxWidth: 100,
    maxHeight: 100,
    marginHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#262625',
    marginTop: 30,
  },
  logout: {
    color: '#262625',
    marginTop: 'auto',
    marginVertical: 20,
    fontSize: 20,
    paddingLeft: 50,
  },
});

export default CustomNav;
