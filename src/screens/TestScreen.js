import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import EdamamPull from '../scripts/EdamamPull';
import EdamamKeys from '../../constants/EdamamKeys';
import Firebase from '../../constants/FirebaseKeys';

const TestScreen = ({ navigation }) => {
  const [pull, onChangePull] = useState(EdamamKeys.foodAppId);

  const PullText = () => {
    onChangePull(EdamamKeys.foodAppId);
  }

  const LogOut = () => {
    Firebase.auth().signOut().then(function() {
      navigation.navigate('Login');
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
  return (
    <View>
      <Text style={styles.textStyle}>
      This is some example text {'\n'}
      {pull}
      </Text>
      <Button
        title="Logout"
        onPress={() => {LogOut()}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    margin: '10%',
    color: '#505050',
    fontSize: 15,
    textAlign: 'left'
  }
});

export default TestScreen;
