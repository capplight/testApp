import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route?.params?.username},
  });

  const username = watch('username');

  const navigation = useNavigation();

  const onConfirmPressed = async data => {
    try {
      await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate('Signin');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Signin');
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert('Success', 'Code was resent to your email');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Confirm your email</Text>

      <CustomInput
        name="username"
        control={control}
        placeholder="Username"
        rules={{
          required: 'Username code is required',
        }}
      />

      <CustomInput
        name="code"
        control={control}
        placeholder="Enter your confirmation code"
        rules={{
          required: 'Confirmation code is required',
        }}
      />

      <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

      <CustomButton
        text="Resend code"
        onPress={onResendPress}
        type="SECONDARY"
      />

      <CustomButton
        text="Back to Sign in"
        onPress={onSignInPress}
        type="TERTIARY"
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

export default ConfirmEmailScreen;
