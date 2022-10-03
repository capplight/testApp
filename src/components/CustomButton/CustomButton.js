import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, text, type = 'PRIMARY'}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}>
      <Text style={(styles.text, styles[`text_${type}`])}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },

  container_PRIMARY: {
    backgroundColor: '#d4a14e',
    fontSize: 18,
  },
  container_SECONDARY: {
    borderColor: '#d4a14e',
    borderWidth: 2,
  },
  container_TERTIARY: {},
  text_PRIMARY: {
    fontWeight: 'bold',
    color: 'black',
  },
  text_TERTIARY: {
    color: 'gray',
  },
  text_SECONDARY: {
    color: '#d4a14e',
    fontWeight: 'bold',
  },
});

export default CustomButton;
