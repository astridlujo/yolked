import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

export default function Button({ text, onPress }){
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.button}>
      <Text style={styles.buttonText}>{ text }</Text>
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create ({
  button: {
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "40%",
    backgroundColor: '#FF9F1C'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 20,
    textAlign: 'center'
  }
})
