import {useState} from 'react';
import {useUserContext} from '../hooks/ContextHooks';
import {useHabit} from '../hooks/apiHooks';
import {Card, Text} from '@rneui/base';
import {TouchableOpacity} from 'react-native';
// import { useForm } from "../hooks/formHooks";

export default function HabitInfo() {
  const values = {habit_frequency: ''};
  const {postFrequency} = useHabit();
  const [editFrequency, setEditFrequency] = useState(false);
  const {user} = useUserContext();

  return (
    <Card>
      <TouchableOpacity>
        <Text>Current habit: {user?.habit_name || 'Not set'}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>
          Current frequency: {user?.habit_frequency}
          {user?.habit_frequency === 1
            ? ' time a week'
            : ' times a week' || 'Not set'}
        </Text>
      </TouchableOpacity>
    </Card>
  );
}
