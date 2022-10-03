import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomNav from '../../components/CustomNav';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const NewPasswordScreen = () => {
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  const onSubmitPressed = async data => {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      navigation.navigate('Signin');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };
  const onSigninPressed = () => {
    navigation.navigate('Signin');
  };
  return (
    <View style={styles.root}>
      <CustomNav />
      <View style={styles.container}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{
            required: 'Username is required',
          }}
        />

        <CustomInput
          name="code"
          control={control}
          rules={{
            required: 'Code is required',
          }}
          placeholder="Code"
        />
        <CustomInput
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
          placeholder="Password"
          secureTextEntry
        />

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />
        <CustomButton
          text="Back to Sign In"
          onPress={onSigninPressed}
          type="TERTIARY"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    marginTop: 70,
    height: 530,
    width: 350,
    borderWidth: 5,
    borderColor: 'blue',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'Bold',
    color: 'black',
    margin: 10,
  },
});

export default NewPasswordScreen;
