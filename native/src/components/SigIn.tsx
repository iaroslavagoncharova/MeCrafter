import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useUserContext} from '../hooks/ContextHooks';
import {Values} from '../types/LocalTypes';
import {useForm, Controller} from 'react-hook-form';
import {Input} from '@rneui/base';

const SignIn = () => {
  const {handleLogin} = useUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const values: Values = {
    username: '',
    password: '',
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: values});

  const doLogin = async (inputs: Values) => {
    console.log('doLogin', inputs);
    handleLogin(inputs);
  };

  return (
    <View style={styles.loginFormContainer}>
      <Text>Sign in if you already have an account</Text>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Username is required',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Password is required',
          },
          maxLength: 20,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={!showPassword}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmit(doLogin)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginFormContainer: {
    alignItems: 'center',
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default SignIn;
