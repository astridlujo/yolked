import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, Picker, Button } from 'react-native';
import { Provider, Portal, Dialog, TextInput, Searchbar} from 'react-native-paper';
import { AddRecipe } from '../scripts/FirebaseFunctions';

const RecipeDetails = ({navigation}) => {
  const recipeObject = navigation.state.params.recipeObject;

  return(
    <View style={{margin: 30, marginTop:50, marginBottom: 100, alignItems: 'center'}}>
      <Button
        title="Save to Favorites"
        onPress={() => {
          AddRecipe(recipeObject);
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default RecipeDetails
