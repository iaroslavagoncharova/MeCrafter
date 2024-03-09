import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useUserContext} from '../hooks/ContextHooks';
import Feed from '../views/Feed';
import Explore from '../views/Explore';
import Tracker from '../views/Tracker';
import Profile from '../views/Profile';
import Diary from '../views/Diary';
import {Feather} from '@expo/vector-icons';
import AuthPage from '../views/AuthPage';
import EditPost from '../views/EditPost';
import CreatePost from '../views/CreatePost';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const {user} = useUserContext();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = 'home' as const;
          } else if (route.name === 'Explore') {
            iconName = 'search' as const;
          } else if (route.name === 'Tracker') {
            iconName = 'activity' as const;
          } else if (route.name === 'Diary') {
            iconName = 'book' as const;
          } else if (route.name === 'Profile') {
            iconName = 'user' as const;
          } else if (route.name === 'Sign up') {
            iconName = 'log-in' as const;
          }

          return <Feather size={size} color={color} name={iconName} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Explore" component={Explore} />
      {user ? (
        <>
          <Tab.Screen name="Tracker" component={Tracker} />
          <Tab.Screen name="Diary" component={Diary} />
          <Tab.Screen name="Profile" component={Profile} />
        </>
      ) : (
        <Tab.Screen name="Sign up" component={AuthPage} />
      )}
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  const {user} = useUserContext();
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen name="EditPost" component={EditPost} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
        </>
      ) : (
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
