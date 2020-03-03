import React, { useState, useReducer, useEffect } from 'react';
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
import FoodItem from '../components/FoodItem';
import { SearchFood, GetMore } from '../scripts/EdamamPull.js';
import { removeDuplicates } from '../scripts/HelperFunctions.js';
import { GetFoods } from '../scripts/FirebaseFunctions.js';

let linkStack = new Array()

const FoodScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [result, setResult] = useState([]); // TODO: Change to foodResult
  const [nextHref, setNextHref] = useState('');
  const [prevHref, setPrevHref] = useState('');
  const [favorites, setFavorites] = useState([]);
  //const myEdamam = new EdamamPull();

  useEffect(() => {
    console.log("Getting Favorites");
    const checkFavorites = navigation.addListener('didFocus', () => {
      CheckFavorites();
    });
  }, [favorites]);

  const CheckFavorites = async () => {
    const response = await GetFoods()
    setFavorites(response);
  }

  const SearchFor = async (foodName) => {
    setResult([]);
    await setNextHref('');
    await setPrevHref('');

    if (foodName.trim() === '') {
      return;
    }

    linkStack = new Array();
    console.log("Search pressed!");
    const [results, next, prev] = await SearchFood(foodName);

    setResult(removeDuplicates(results.hints, 'food'));
    if (next.nHref !== undefined) {
      await setNextHref(next.nHref);
    } else {
      await setNextHref('')
    }
    await linkStack.push(prev.pHref);
    CheckFavorites()
  }

  const GetNext = async (href) => {
    console.log('Getting next');
    setResult([]);
    const [newResults, next] = await GetMore(href);

    setResult(removeDuplicates(newResults.hints, 'food'));

    console.log('PEEK' + linkStack[linkStack.length-1]);
    setPrevHref(linkStack[linkStack.length-1]);

    linkStack.push(href);

    if (next.nHref !== undefined) {
      setNextHref(next.nHref);
    } else {
      setNextHref('')
    }
  }

  const GetPrev = async (href) => {
    console.log('Getting previous! ' + href);
    setResult([]);
    const [newResults, next] = await GetMore(href);

    setResult(removeDuplicates(newResults.hints, 'food'));
    setNextHref(next.nHref);

    if (linkStack.length !== 1) {
      console.log("POP!");

      linkStack.pop();
      console.log('PEEK ' + linkStack[linkStack.length-1]);
      setPrevHref(linkStack[linkStack.length-2]);
      if (linkStack.length === 1) {
        setPrevHref('');
      }
    }
  }

  return (
    <View style={{margin: 10, marginTop:50, marginBottom: 100}}>
      <TextInput
        placeholder='Search for food items...'
        //style={}
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <Button
        title="Search"
        onPress={async() => {
          await SearchFor(searchText)

          console.log('PREVIOUS ' + prevHref);
          console.log('NEXT ' + nextHref);
          console.log(linkStack)
        }}
      />
      <FlatList
        numColumns={2}
        keyExtractor={food => food.food.foodId}
        data={result}
        ListFooterComponent={() =>{
          return(
            <View>
            {nextHref != '' && nextHref != undefined &&
            <TouchableOpacity
              //style={styles.itemTouch, { width: '50%'}}
              onPress={async() => {
                await GetNext(nextHref);

                console.log('PREVIOUS ' + prevHref);
                console.log('NEXT ' + nextHref);
                console.log(linkStack);
              }}
            >
              <Text>Next</Text>
            </TouchableOpacity>
            }
            {prevHref != '' && prevHref != undefined &&
            <TouchableOpacity
              //style={styles.itemTouch, { width: '50%'}}
              onPress={async() => {
                await GetPrev(prevHref);

                console.log('PREVIOUS ' + prevHref);
                console.log('NEXT ' + nextHref);
                console.log(linkStack);
              }}
            >
              <Text>Previous</Text>
            </TouchableOpacity>
            }
            </View>
          )
        }}
        renderItem={({ item }) => {
          if (result.length === 0) {
            return null;
          } else {
            let inPantry = false;
            let quantity = 0;
            if (favorites.some(e => e.food.foodId === item.food.foodId)) {
              inPantry = true;
              item = favorites.find(e => e.food.foodId === item.food.foodId)
              quantity = item.quantity;
            }
            return (
              <FoodItem
                foodObject={item}
                navigation={navigation}
                inPantry={inPantry}
                quantity={quantity}
              />
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
