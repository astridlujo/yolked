import React, { useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, FlatList, Picker, Button, Image, Linking } from 'react-native';
import { Provider, Portal, Dialog, TextInput, Searchbar } from 'react-native-paper';
import { AddRecipe } from '../scripts/FirebaseFunctions';

const RecipeDetails = ({navigation}) => {
  const recipeObject = navigation.state.params.recipeObject;

  return(
    <Provider>
      <View style={{margin: 10, marginTop:10, marginBottom: 10, alignItems: 'center'}}>
        <View>
          <Text style={styles.title}>{recipeObject.recipe.label}</Text>
        </View>
        <SafeAreaView style={{height:'85%'}}>
          <Image
            style={styles.image}
            source={{uri: recipeObject.recipe.image}}
          />
          <Text style={styles.title}>Info</Text>
          <View style={styles.details}>
            <Text>Source: {recipeObject.recipe.source}</Text>
            <Text>Calories: {recipeObject.recipe.calories.toFixed(0)}</Text>
          </View>
          <Text style={styles.title}>Ingredients</Text>
          <FlatList
            data={recipeObject.recipe.ingredientLines}
            renderItem={({ item }) => {
              return (
                <Text>- {item}</Text>
              )
            }}
          />
        </SafeAreaView>
        <View style={styles.options}>
          <Button
            title="Save Recipe"
            onPress={() => {
              //console.log(recipeObject);
              AddRecipe(recipeObject);
            }}
          />
          <Button
            title="Source"
            onPress={() => {
              //console.log(recipeObject);
              Linking.openURL(recipeObject.recipe.url);
            }}
          />
        </View>
        <Portal>
        </Portal>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto',
    fontSize: 22,
    textAlign: "center"
  },

  image: {
    width: 250,
    height: 250,
    borderRadius: 20,
    borderWidth:5,
    borderColor:'#BBB',
    padding: 10,

  },
  options: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  details: {
    flexDirection: "column",
    padding: 15,
    justifyContent: "space-around"
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#CCC',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  }
});

export default RecipeDetails
