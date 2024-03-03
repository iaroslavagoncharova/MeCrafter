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

const styles = StyleSheet.create({
  authPageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authSwitchButtonsContainer: {
    marginBottom: 20,
  },
  authSwitchButtons: {
    flexDirection: 'row',
  },
  authSwitchButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#007bff',
  },
  activeButton: {
    backgroundColor: '#0056b3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AuthPage;

// import { View, Text } from 'react-native'
// import React from 'react'

// export default function AuthPage() {
//   return (
//     <View>
//       <Text>AuthPage</Text>
//     </View>
//   )
// }
