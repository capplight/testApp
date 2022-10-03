import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomNav from '../../components/CustomNav';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignupScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');

  const navigation = useNavigation();

  const onRegisterPressed = async data => {
    const {username, password, email, name} = data;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {email, name, preferred_username: username},
      });
      navigation.navigate('ConfirmEmail', {username});
    } catch (e) {
      Alert.alert('Opps', e.message);
    }
  };

  const onSigninPressed = () => {
    navigation.navigate('Signin');
  };

  return (
    <View style={styles.root}>
      <CustomNav />
      <Text style={styles.title}>Create an account</Text>

      <CustomInput
        name="name"
        placeholder="Name"
        control={control}
        rules={{
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name should be at least 2 characters long',
          },
        }}
      />

      <CustomInput
        name="username"
        placeholder="Username"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username should be at least 3 characters long',
          },
          maxLength: {
            value: 24,
            message: 'Username should be max 24 characters long',
          },
        }}
      />
      <CustomInput
        name="Email"
        placeholder="Email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
        }}
      />
      <CustomInput
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password should be at least 8 characters long',
          },
        }}
      />
      <CustomInput
        name="password-repeat"
        control={control}
        placeholder="Repeat Password"
        secureTextEntry
        rules={{
          validate: value => value === pwd || 'Passwords do not match',
        }}
      />
      <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />
      <CustomButton
        text="Have an account? Sign In"
        onPress={onSigninPressed}
        type="TERITARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'Bold',
    color: 'black',
    margin: 10,
  },
});

export default SignupScreen;
