import {Controller, useForm} from 'react-hook-form';
import {PostWithOwner} from '../types/DBTypes';
import {usePost} from '../hooks/apiHooks';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Keyboard, ScrollView, TouchableOpacity} from 'react-native';
import {useEffect} from 'react';
import {Button, Card} from '@rneui/base';
import {Input} from '@rneui/themed';
import useUpdateContext from '../hooks/updateHooks';

const EditPost = ({route}: any) => {
  const post: PostWithOwner = route.params;
  const {putPost} = usePost();
  const {update, setUpdate} = useUpdateContext();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const values: Pick<PostWithOwner, 'post_title' | 'post_text'> = {
    post_title: post.post_title,
    post_text: post.post_text,
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({defaultValues: values});

  const resetForm = () => {
    reset(values);
  };

  const edit = async (
    inputs: Pick<PostWithOwner, 'post_title' | 'post_text'>,
  ) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return;
      }
      const result = await putPost(post.post_id, inputs, token);
      Alert.alert(result.message);
      setUpdate(!update);
      navigation.navigate('Feed');
      resetForm();
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetForm();
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}
        activeOpacity={1}
      >
        <Card>
          <Controller
            control={control}
            rules={{
              required: {
                value: false,
                message: '',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.post_title?.message}
              />
            )}
            name="post_title"
          />
          <Controller
            control={control}
            rules={{
              required: {
                value: false,
                message: '',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Text"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.post_text?.message}
              />
            )}
            name="post_text"
          />
          <Button title={'Save'} onPress={handleSubmit(edit)} />
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditPost;
