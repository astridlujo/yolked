import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import EdamamPull from '../scripts/EdamamPull';
import EdamamKeys from '../../constants/EdamamKeys';
import Firebase, { database } from '../../constants/FirebaseKeys';

const TestScreen = ({ navigation }) => {
  const [pull, onChangePull] = useState('Example state');
  const [pull2, onChangePull2] = useState([]);

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

  const TestID = () => {
    Firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        database.collection('users').doc(user.uid).get().then(doc =>{
          const favFoods = [];
          doc.data().favFoods.forEach(item => {
            favFoods.push(JSON.parse(item));
          });

          console.log(favFoods);

          onChangePull2(favFoods);
        });
        console.log(user);
        onChangePull('Hello, ' + user.displayName)
      } else {
        alert('User signed out');
      }
    })
  }
  return (
    <View>
      <Text style={styles.textStyle}>
      This is some example text {'\n'}
      {pull}
      </Text>
      <Button
        title="Test UID"
        onPress={() => {TestID()}}
      />
      <Button
        title="Logout"
        onPress={() => {LogOut()}}
      />
      <FlatList
        keyExtractor={item => item.food.foodId}
        data={pull2}
        renderItem={({item}) => {
          if (pull2.length === 0) {
            return;
          } else {
            return (
              <Text>{item.food.label} has a quantity of {item.quantity}</Text>
            )
          }
        }}
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
