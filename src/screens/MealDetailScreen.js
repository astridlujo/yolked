import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import { MEALS } from '../../data/dummy-data'

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDetailScreen = props => {

  const mealID = props.navigation.getParam('mealID')

  const selectedMeal = MEALS.find(meal => meal.id === mealID);

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />

      <View style={styles.details}>
        <Text>{selectedMeal.duration}m</Text>
        <Text>{selectedMeal.complexity.toUpperCase()}</Text>
        <Text>{selectedMeal.affordability.toUpperCase()}</Text>
      </View>

      <Text style={styles.title}>Ingedients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}

      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}

    </ScrollView>
  );
};

// Render the Title of the Meal on the Header
MealDetailScreen.navigationOptions = navigationData => {
  const mealID = navigationData.navigation.getParam('mealID');
  const selectedMeal = MEALS.find(meal => meal.id === mealID);

  return {
    headerTitle: selectedMeal.title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Favorite'
          iconName='ios-star'
          onPress={() => {
            console.log('Mark as Favorite!')
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto',
    fontSize: 22,
    textAlign: "center"
  },

  image: {
    width: '100%',
    height: 200
  },

  details: {
    flexDirection: "row",
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

export default MealDetailScreen;
