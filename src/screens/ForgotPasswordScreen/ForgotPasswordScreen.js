import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomNav from '../../components/CustomNav';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  const onSigninPressed = () => {
    navigation.navigate('Signin');
  };
  const onSendPressed = async data => {
    try {
      await Auth.forgotPassword(data.username);
      navigation.navigate('NewPassword');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
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

        <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />
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
    marginTop: 120,
    height: 300,
    width: 350,
    borderWidth: 5,
    borderColor: 'blue',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    margin: 10,
    alignSelf: 'center',
  },
});

export default ForgotPasswordScreen;
