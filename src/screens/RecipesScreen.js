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
import RecipeItem from '../components/RecipeItem'; // Change to Recipe Item
import { SearchRecipe } from '../scripts/EdamamPull.js';
import { GetRecipes } from '../scripts/FirebaseFunctions.js';
import CustomButton from '../components/Button';

const RecipesScreen = ({ navigation }) => {
  // State variables
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [result, setResult] = useState([]);

  // Onstartup, check favorites
  useEffect(() => {
    const checker = navigation.addListener('didFocus', () => {
      CheckFavorites();
    });
  },);

  const CheckFavorites = async () => {
    const response = await GetRecipes();
    setFavorites(response);
  };

  const SearchFor = async (recipeQuery) => {
    setResult([]);

    if (recipeQuery.trim() === '') {
      return;
    }

    const [results, from, to] = await SearchRecipe(recipeQuery, 0, 100);
    console.log(results.hits);
    console.log('FROM: ' + from.from);
    setResult(results.hits);
  }

  return (
    <View style={{padding:20, marginBottom: 100}}>
      <TextInput
      style={styles.textInputStyle}
        placeholder='Search for recipes...'
        //style={}
        onChangeText={text => setSearchText(text)}
        value={searchText}
        autoCapitalize="none"
      />
      <CustomButton
        text="Search"
        onPress={async() => {
          await SearchFor(searchText);
        }}
      />
      <FlatList
        numColumns={2}
        keyExtractor={recipe => recipe.recipe.url} // URLs are farely unique...
        data={result}
        // ListFooterComponent={() => {
        //
        // }}
        renderItem={({ item }) => {
          if (result.length === 0) {
            return null;
          } else {
            // User favorites checks...
            let inFavorites = false;
            if (favorites.some(e => e.recipe.url === item.recipe.url)){
              inFavorites = true;
            }
            return (
              <RecipeItem
                recipeObject={item}
                navigation={navigation}
                inFavorites={inFavorites}
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

export default RecipesScreen;
