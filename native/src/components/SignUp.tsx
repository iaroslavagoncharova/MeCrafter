import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import {useUser} from '../hooks/apiHooks';
import {Controller, useForm} from 'react-hook-form';
import {Input} from '@rneui/base';

const SignUp = ({handleToggle}: {handleToggle: () => void}) => {
  const {postUser, getUsernameAvailability, getEmailAvailability} = useUser();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const values = {username: '', password: '', confirmPassword: '', email: ''};
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({defaultValues: values, mode: 'onBlur'});

  const register = async (inputs: {
    username: string;
    password: string;
    confirmPassword?: string;
    email: string;
  }) => {
    try {
      delete inputs.confirmPassword;
      await postUser(inputs);
      Alert.alert('User successfully created! You can sign in now');
      handleToggle();
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const styles = {
    input: {
      marginBottom: 10,
    },
    signupButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
  };

  return (
    <View>
      <Text>Create an account to start tracking your habits</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
          />
        )}
        name="username"
        rules={{required: {
          value: true,
          message: 'Username is required',
        },
        validate: async (value) => {
          try {
            const {available} = await getUsernameAvailability(value);
            return available ? available : 'Username not available';
          } catch (error) {
            console.log((error as Error).message);
          }
        },
}
        }
      />
      <Controller
        control={control}
        name="email"
        rules={{required: {
          value: true,
          message: 'Email is required',
        }, pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Invalid email address',
        },
        validate: async (value) => {
          try {
            const {available} = await getEmailAvailability(value);
            return available ? available : 'Email already in use';
          } catch (error) {
            console.log((error as Error).message);
          }
        },
        }
      }
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            autoCapitalize='none'
            errorMessage='Email is required'
          />
        )}
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={!showPassword}
            placeholder="Password"
          />
        )}
        name="password"
        rules={{required: {
          value: true,
          message: 'Password is required',
        },
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters long',
        },
        validate: (value) => value === getValues('confirmPassword') || 'Passwords do not match',
      }}
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={!showPassword}
            placeholder="Confirm password"
          />
        )}
        name="confirmPassword"
        rules={{
          required: true,
          validate: (value) => value === getValues('password'),
        }}
      />
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSubmit(register)}>
        <Text>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
