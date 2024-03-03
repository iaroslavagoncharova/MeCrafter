import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Keyboard} from 'react-native';
import SignIn from '../components/SigIn';
import SignUp from '../components/SignUp';
import {useUserContext} from '../hooks/ContextHooks';
import {Button} from '@rneui/base';

const AuthPage = () => {
  const [register, setRegister] = useState(false);
  const handleToggle = () => setRegister(!register);
  const {handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      activeOpacity={1}
      style={{flex: 1}}
    >
      {!register ? (
        <SignIn />
      ) : (
        <SignUp handleToggle={handleToggle} />
      )}
      <Button onPress={handleToggle} title={register ? 'Sign in' : 'Sign up'} />
    </TouchableOpacity>
  );
};

export default AuthPage;
