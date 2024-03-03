import {useState} from 'react';
import {usePost} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';
import {PostWithOwner} from '../types/DBTypes';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Card, Avatar, ListItem, Button} from '@rneui/base';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUpdateContext from '../hooks/updateHooks';
import {Feather} from '@expo/vector-icons';

const FeedPost = ({post}: {post: PostWithOwner}) => {
  const navigation = useNavigation();
  const {user} = useUserContext();
  const {putPost, deletePost} = usePost();
  const [editing, setEditing] = useState(false);
  const {update, setUpdate} = useUpdateContext();

  const inputs = {
    post_title: post.post_title,
    post_text: post.post_text,
  };

  const handleDelete = async () => {
    Alert.alert('Are you sure you want to delete this post?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
              return;
            }
            const result = await deletePost(post.post_id, token);
            Alert.alert(result.message);
            setUpdate(!update);
          } catch (error) {
            console.log((error as Error).message);
          }
        },
      },
    ]);
  };

  return (
    <Card>
      <View style={styles.header}>
        <Avatar
          rounded
          source={{uri: 'http://via.placeholder.com/150x150'}}
          size="medium"
        />
        <Text style={styles.username}>{post.username}</Text>
      </View>
      <Card.Divider />
      <Text style={styles.postTitle}>{post.post_title}</Text>
      <Text style={styles.postText}>{post.post_text}</Text>
      <Card.Image
        source={{uri: post.thumbnail}}
        style={{aspectRatio: 1, height: 200}}
      />
      <Card.Divider />
      <ListItem style={styles.actions}>
        {user?.user_id === post.user_id ? (
          <>
            <TouchableOpacity onPress={handleDelete}>
              <Text style={styles.actionButton}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditPost', {post});
              }}
            >
              <Text style={styles.actionButton}>Edit</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
          <View style={styles.mainContainer}>
            <TouchableOpacity>
              <View style={styles.iconContainer}>
                <Feather name="heart" size={40} color="red" />
                <Text>12</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.iconContainer}>
                <Feather name="message-square" size={40} color="blue" />
                <Text>3</Text>
              </View>
            </TouchableOpacity>
          </View>
          </>
        )}
      </ListItem>
    </Card>
  );
};

export default FeedPost;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  postContainer: {
    height: 300,
  },
  postText: {
    fontSize: 16,
  },
  postImage: {
    aspectRatio: 1,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
