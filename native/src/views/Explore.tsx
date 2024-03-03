import {View, Text, Alert, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useHabit} from '../hooks/apiHooks';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {Button, Card, ListItem} from '@rneui/base';
import {Input} from '@rneui/themed';
import RNPickerSelect from 'react-native-picker-select';

export default function Explore() {
  const [filter, setFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const {habits} = useHabit();
  const [selectedCategory, setSelectedCategory] = useState('');
  const placeholder = {
    label: 'Select an option...',
    value: null,
  };
  const items = [
    {label: 'Health', value: 'Health', color: 'blue', inputLabel: 'Health', key: 'Health'},
    {label: 'Productivity', value: 'Productivity', color: 'blue', inputLabel: 'Productivity', key: 'Productivity'},
    {label: 'Relationships', value: 'Relationships', color: 'blue', inputLabel: 'Relationships', key: 'Relationships'},
    {label: 'Finance', value: 'Finance', color: 'blue', inputLabel: 'Finance', key: 'Finance'},
    {label: 'Self-care', value: 'Self-care', color: 'blue', inputLabel: 'Self-care', key: 'Self-care'},
    {label: 'Personal', value: 'Personal', color: 'blue', inputLabel: 'Personal', key: 'Personal'},
  ];
  const filteredHabits = habits.filter(
    (habit) =>
      (habit.habit_category === filter || filter === '') &&
      (habit.habit_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        searchInput === '' ||
        habit.habit_description
          .toLowerCase()
          .includes(searchInput.toLowerCase())),
  );
  const values = {habit_id: ''};
  const {updateHabit} = useHabit();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: values});

  const changeHabit = async (inputs: {habit_id: string}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const result = await updateHabit(inputs, token);
        Alert.alert(result.message);
        navigation.navigate('Tracker');
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const resetFilters = () => {
    setFilter('');
    setSelectedCategory('');
    setSearchInput('');
  };

  return (
    <View>
      <Text>Explore new habits to incorporate into your daily routine</Text>
      <Input
        placeholder="Search for a habit"
        value={searchInput}
        onChange={(e) => setSearchInput(e.nativeEvent.text)}
      />
      <RNPickerSelect
        placeholder={placeholder}
        items={items}
        onValueChange={(value) => setSelectedCategory(value)}
        value={selectedCategory}
      />
      {filter || selectedCategory ? (
        <Text>Category: {filter || selectedCategory}</Text>
      ) : null}
      <FlatList
        data={filteredHabits}
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <Text style={styles.headerText}>{item.habit_name}</Text>
            <Text>{item.habit_description}</Text>
            <Text>Category: {item.habit_category}</Text>
            <Button
              onPress={() => {
                values.habit_id = item.habit_id.toString();
                changeHabit(values);
              }}
            >
              Add
            </Button>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'blue',
  },
});
//   const { handleSubmit, inputs } = useForm(changeHabit, values);

//   return (
//     <>
//       <h1>Explore</h1>
//       <p>Explore new habits to incorporate into your daily routine</p>
//       {filter || selectedCategory ? (
//         <p>Category: {filter || selectedCategory}</p>
//       ) : null}
//       <div id="explore-content" className="row">
//         <div className="col-md-4 content-left">
//           <div className="card">
//             <div className="card-body">
//               <div className="row align-items-center justify-content-center">
//                 <div id="search-input" className="row">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search for a habit"
//                     value={searchInput}
//                     onChange={(e) => setSearchInput(e.target.value)}
//                   />
//                 </div>
//                 <div className="row">
//                   <select
//                     className="form-select"
//                     value={selectedCategory ? selectedCategory : filter}
//                     onChange={(e) => setFilter(e.target.value)}
//                   >
//                     <option value="">Pick a category</option>
//                     <option value="Health">Health</option>
//                     <option value="Productivity">Productivity</option>
//                     <option value="Relationships">Relationships</option>
//                     <option value="Finance">Finance</option>
//                     <option value="Self-care">Self-care</option>
//                     <option value="Personal">Personal</option>
//                   </select>
//                 </div>
//                 <div className="col-sm-4">
//                   <button
//                     id="reset-btn"
//                     className="btn btn-secondary btn-block"
//                     onClick={resetFilters}
//                   >
//                     Reset
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-8 content-right">
//           <div id="habit-cards-div" className="card">
//             <div className="card-body">
//               <div className="row">
//                 {filteredHabits.map((habit) => (
//                   <div key={habit.habit_id} className="col-12 mb-3 col-md-6">
//                     <div id="habit-card" className="card text-center">
//                       <div className="card-body">
//                         <h5 className="card-title">{habit.habit_name}</h5>
//                         <p className="card-text">{habit.habit_description}</p>
//                         <p>Category: {habit.habit_category}</p>
//                         <button
//                           className="btn btn-primary btn-block"
//                           onClick={(e) => {
//                             inputs.habit_id = habit.habit_id.toString();
//                             handleSubmit(e);
//                           }}
//                         >
//                           Add
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
