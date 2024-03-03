import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import AuthPage from './src/views/AuthPage';

import Navigator from './src/navigators/Navigator';
import {UserProvider} from './src/contexts/UserContext';
import {UpdateProvider} from './src/contexts/UpdateContext';

export default function App() {
  return (
    <UserProvider>
      <UpdateProvider>
        <Navigator />
        <StatusBar style="auto" />
      </UpdateProvider>
    </UserProvider>
  );
}
