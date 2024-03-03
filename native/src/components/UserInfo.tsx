import { useEffect, useState } from "react";
import { UnauthorizedUser } from "../types/DBTypes";
import { useUserContext } from "../hooks/ContextHooks";
import {Avatar, Button, Card, ListItem, Text} from "@rneui/base";

export default function UserInfo({ user }: { user: UnauthorizedUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const {handleEdit} = useUserContext();
  const {handleDelete} = useUserContext();

  return (
    <>
    {user ? (
      <Card>
        <Avatar source={{uri: "https://i.imgur.com/CFpa3nK.jpg"}} size="large" rounded/>
        <ListItem>
          <Text>{user.username}</Text>
        </ListItem>
        <ListItem>
          <Text>Joined on {new Date(user.created_at).toLocaleDateString('fi-FI')}</Text>
        </ListItem>
        <ListItem>
          <Text>{user.email}</Text>
        </ListItem>
        <Button onPress={() => setIsEditing(true)}>Edit</Button>
        <Button onPress={handleDelete}>Delete</Button>
      </Card>
      ) : null
    }
    </>
  )
};
