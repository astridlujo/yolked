import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View
      style={{padding:50}}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('Pantry')}
      >
        <View style={styles.tileContainer}>
          <Text>My Pantry</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  tileContainer: {
    height: 250,
    width: 250
  },
  screenFlex: {
    padding: 300
  }
});

export default HomeScreen;
