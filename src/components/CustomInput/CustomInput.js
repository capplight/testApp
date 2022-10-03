import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <View style={styles.root}>
          <Text style={styles.placeholder}>{placeholder}</Text>
          <View
            style={[styles.container, {borderColor: error ? 'red' : 'blue'}]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    borderWidth: 3,
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#e0e3de',
  },
  input: {},
  placeholder: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
  },
  logout: {
    color: '#262625',
    marginTop: 'auto',
    marginVertical: 20,
    fontSize: 20,
    paddingLeft: 50,
  },
});

export default CustomInput;
