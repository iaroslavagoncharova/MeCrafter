import { View, Text, Alert, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import React, {useEffect, useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import {useFile, usePost} from '../hooks/apiHooks';
import useUpdateContext from '../hooks/updateHooks';
import {NavigationProp, ParamListBase, useNavigation} from '@react-navigation/native';
import {Values} from '../types/LocalTypes';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Card, Image} from '@rneui/base';
import {Input} from '@rneui/themed';
import {Video} from 'expo-av';

export default function CreatePost() {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(null);
  const {postExpoFile} = useFile();
  const {postPost} = usePost();
  const {update, setUpdate} = useUpdateContext();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const values = {
    post_title: '',
    post_text: '',
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({defaultValues: values});

  const resetForm = () => {
    reset(values);
    setImage(null);
  };

  const create = async (inputs: {post_title: string, post_text: string}) => {
    if (!image) {
      Alert.alert('Please select an image');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const result = await postExpoFile(image.assets![0].uri, token);
        const postResult = await postPost(result, inputs, token);
        Alert.alert(postResult.message);
        setUpdate(!update);
        navigation.navigate('Feed');
        resetForm();
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const chooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
    });

    if (!result.canceled) {
      setImage(result);
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
                value: true,
                message: 'Title is required',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="post_title"
            defaultValue=""
          />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Text is required',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Text"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
              />
            )}
            name="post_text"
            defaultValue=""
          />
          {image && image.assets![0].mimeType?.includes('video') ? (
            <Video source={{uri: image.assets![0]?.uri}} style={{width: 200, height: 200}} useNativeControls />
          ) : (
            <Card.Image
            onPress={chooseImage}
            style={{aspectRatio: 1, height: 200}}
              source={{uri: image ? image.assets?.[0]?.uri : 'https://via.placeholder.com/150?text=Select+image'}}
            />
          )}
          <Button title="Create" onPress={handleSubmit(create)} />
        </Card>
      </TouchableOpacity>

    </ScrollView>
  )
}
