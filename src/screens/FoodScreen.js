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
import CustomButton from '../components/Button';

let linkStack = new Array();

const FoodScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [result, setResult] = useState([]); // TODO: Change to foodResult
  const [nextHref, setNextHref] = useState('');
  const [prevHref, setPrevHref] = useState('');
  const [favorites, setFavorites] = useState([]);
  //const myEdamam = new EdamamPull();

  useEffect(() => {
    const checker = navigation.addListener('didFocus', () => {
      CheckFavorites();
    });
  }, [navigation]);

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
    const [results, next, prev] = await SearchFood(foodName);

    setResult(removeDuplicates(results.hints, 'food'));
    if (next.nHref !== undefined) {
      await setNextHref(next.nHref);
    } else {
      await setNextHref('')
    }
    await linkStack.push(prev.pHref);
    CheckFavorites();
  }

  const GetNext = async (href) => {
    setResult([]);
    const [newResults, next] = await GetMore(href);

    setResult(removeDuplicates(newResults.hints, 'food'));

    setPrevHref(linkStack[linkStack.length-1]);

    linkStack.push(href);

    if (next.nHref !== undefined) {
      setNextHref(next.nHref);
    } else {
      setNextHref('')
    }
  }

  const GetPrev = async (href) => {
    setResult([]);
    const [newResults, next] = await GetMore(href);

    setResult(removeDuplicates(newResults.hints, 'food'));
    setNextHref(next.nHref);

    if (linkStack.length !== 1) {
      linkStack.pop();
      setPrevHref(linkStack[linkStack.length-2]);
      if (linkStack.length === 1) {
        setPrevHref('');
      }
    }
  }

  return (
    <View style={{
      padding: 20,
      backgroundColor: '#FFF'}}>
      <TextInput
        placeholder='Search for food items...'
        style={styles.textInputStyle}
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <CustomButton
        text="Search"
        onPress={async() => {
          await SearchFor(searchText)
        }}
      />
      <FlatList
        style={{height:'85%'}}
        numColumns={2}
        keyExtractor={food => food.food.foodId}
        data={result}
        ListFooterComponent={() =>{
          return(
            <View style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width:'100%',
              justifyContent: 'space-between',
              padding: 10
            }}>
            {prevHref != '' && prevHref != undefined &&
            <CustomButton
              text='Previous'
              onPress={async() => {
                await GetPrev(prevHref);
              }}
            />
            }
            {nextHref != '' && nextHref != undefined &&
            <CustomButton
              text='Next'
              onPress={async() => {
                await GetNext(nextHref);
              }}
            />
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
            let unit = '';
            if (favorites.some(e => e.foodData.food.foodId === item.food.foodId)) {
              inPantry = true;
              const itemValues = favorites.find(e => e.foodData.food.foodId === item.food.foodId)
              quantity = itemValues.quantity;
              unit = itemValues.unit;
            }
            return (
              <FoodItem
                foodObject={item}
                navigation={navigation}
                inPantry={inPantry}
                quantity={quantity}
                unit={unit}
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
  },

  welcomeStyle: {
    padding: 15,
    fontSize: 35,
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto',
    // color: '#fff'
  },

  textInputStyle: {
    borderColor: '#3E442B',
      borderWidth: 2,
      fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto',
      paddingBottom: 10,
      borderRadius: 10,
      marginBottom: 20,
      fontSize: 20,
      textAlign: "center",
      color: '#153131',
      backgroundColor: '#FEFCFB'
  }
});

export default FoodScreen;
