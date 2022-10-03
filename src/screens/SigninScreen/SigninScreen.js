import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomNav from '../../components/CustomNav';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const SigninScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  console.log(errors);

  const SubmitPressed = async data => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await Auth.signIn(data.username, data.password);
      console.log(response);
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    setLoading(false);
    navigation.navigate('Home');
    // console.log(data);
    // //validate user
    // navigation.navigate('Home');
  };
  const onForgotPasswordPressed = () => {
    //validate user
    navigation.navigate('ForgotPassword');
  };
  const onSignupPressed = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.root}>
      <CustomNav />
      <View style={styles.container}>
        <Text style={styles.title}>Authorisation</Text>
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
          }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />

        <CustomButton
          text={loading ? 'Loading...' : 'Submit'}
          onPress={handleSubmit(SubmitPressed)}
        />
        <CustomButton
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
          type="TERITARY"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    marginTop: 100,
    height: 420,
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

export default SigninScreen;
