import { View, Text } from 'react-native'
import React from 'react'
import UserInfo from "../components/UserInfo";
import HabitInfo from "../components/HabitInfo";
import { useUserContext } from "../hooks/ContextHooks";
import {NavigationProp, ParamListBase, useNavigation} from '@react-navigation/native';
import {Button, Card, Icon} from '@rneui/base';
import {CardImage} from '@rneui/base/dist/Card/Card.Image';

export default function Profile() {
  const { user, handleLogout } = useUserContext();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <>
    {user && (
      <Card>
        <Text>Welcome, {user.username}!</Text>
      <UserInfo user={user} />
      <HabitInfo />
      <Button onPress={handleLogout}>Sign out</Button>
</Card>
    )}
    </>

    // export default function Profile() {
    //   const { user } = useUserContext();
    //   const { handleLogout } = useUserContext();
    //   return (
    //     <div className="container text-center">
    //       <h1>Profile</h1>
    //       {user && (
    //         <>
    //           <h2>Welcome, {user.username}!</h2>
    //           <div className="row align-items-center justify-content-center">
    //             <UserInfo user={user} />
    //           </div>
    //           <div className="row align-items-center justify-content-center">
    //             <HabitInfo />
    //           </div>
    //           <button className="btn btn-primary" onClick={handleLogout}>
    //             Sign out
    //           </button>
    //         </>
    //       )}
    //     </div>
    //   );
    // }
  )
}
