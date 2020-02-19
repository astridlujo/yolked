import React, { useState, useReducer } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';
import { SearchFood } from '../scripts/EdamamPull.js';

const FoodScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [result, setResult] = useState([]);
  //const myEdamam = new EdamamPull();

  const SearchFor = async (foodName) => {
    setResult([]);
    console.log("Search pressed!");
    setResult(await SearchFood(foodName));
    console.log("RESULT", result);
  }


  return (
    <View style={{margin:50}}>
      <TextInput
        placeholder='Search for food items...'
        //style={}
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <Button
        title="Search"
        onPress={() => {
          SearchFor(searchText)
        }}
      />
      <FlatList
        keyExtractor={food => food['food']['foodId']}
        data={result}
        renderItem={({ item }) => {
          if (result.length === 0) {
            return;
          } else {
            return (
              <TouchableOpacity style={styles.itemTouch}>
                <Text>{item['food']['label']}</Text>
              </TouchableOpacity>
            )
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemTouch: {
    padding: '2%',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'black',
    width: '100%',
    minHeight: 30,
    marginBottom: 10,
  }
});

export default FoodScreen;
