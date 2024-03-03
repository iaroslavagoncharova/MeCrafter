import {View, Text, FlatList, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import {usePost} from '../hooks/apiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeedPost from '../components/FeedPost';
import CreatePost from './CreatePost';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Button} from '@rneui/base';
import {useUserContext} from '../hooks/ContextHooks';
import {SafeAreaView} from 'react-native-safe-area-context';

const Feed = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {postArray} = usePost();
  const {user} = useUserContext();
  return (
    <SafeAreaView style={{flex: 1}}>
      {user ? (
        <Button
          onPress={() => {
            navigation.navigate('CreatePost');
          }}
        >
          Create a post
        </Button>
      ) : (
        <>
          <Text>Create a profile to share your thoughts with the world!</Text>
          <Button
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          >
            Sign in
          </Button>
        </>
      )}
      <FlatList
        data={postArray}
        renderItem={({item}) => <FeedPost post={item} />}
      />
    </SafeAreaView>
  );
};

export default Feed;
