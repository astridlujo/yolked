import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList } from 'react-native';
import { Provider, Portal, Dialog, TextInput, Searchbar, Button } from 'react-native-paper';
import { NutrientMap } from '../../constants/Nutrients';
import { AddFood } from '../scripts/FirebaseFunctions';

const FoodDetail = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [amountItem, onChangeAmount] = useState('');
  const [searchInput,onSeachChange] = useState('');

  const foodObject = navigation.state.params.foodObject;
  const food = foodObject.food;
  const nutrients = food.nutrients;

  const AddToFavorites = (amount, foodObj) => {
    const newFoodObj = {
      "quantity": parseInt(amount),
      "food": foodObj.food
    }
    AddFood(newFoodObj);
  }

  return (
    <Provider>
      <View style={{margin: 30, marginTop:50, marginBottom: 100, alignItems: 'center'}}>
        <Text style={styles.title}>{food.label}</Text>
        <Text style={styles.subTitle}>Nutrients</Text>
        <FlatList
          keyExtractor={nutrient => NutrientMap.nutrient}
          data={NutrientMap}
          renderItem={({ item }) => {
            if (item.nutrient in nutrients) {
              return(
                <Text>{item.content.name}: {nutrients[item.nutrient].toFixed(2)} {item.content.unit}</Text>
              );
            }
          }}
        />
        <Button
          onPress={() => {
            setVisible(true);
          }}
        >Add to Pantry</Button>
        <Portal>
          <Dialog
          visible={visible}
          onDismiss={() =>{setVisible(false)}}>
            <Dialog.Content>
              <TextInput
                label='Amount'
                value={`${amountItem}`}
                placeholder='e.g. 2'
                onChangeText={text => {
                  if (text >= 0 && !text.match( /^(\d+\.)$/ )) {
                    onChangeAmount(text);
                  }
                }}
                keyboardType={'numeric'}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress= {() =>{
                  // Add to pantry, close popup.
                  AddToFavorites(amountItem, foodObject);
                  setVisible(false);
                  console.log(amountItem);
                }}
              >Submit</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
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

export default FoodDetail;
