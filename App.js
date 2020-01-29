import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Import the recipe screen
import RecipeCategory from './screens/RecipeCategory'

export default function App() {
  return (
    <View style={styles.container}>
      <RecipeCategory />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
