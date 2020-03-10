import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, Picker } from 'react-native';
import { Provider, Portal, Dialog, TextInput, Searchbar, Button } from 'react-native-paper';
import { NutrientMap } from '../../constants/Nutrients';
import { AddFood, RemoveFood } from '../scripts/FirebaseFunctions';

const FoodDetails = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [amountItem, onChangeAmount] = useState('');
  const [searchInput, onSeachChange] = useState('');
  const [quantity, setQuantity] = useState(navigation.state.params.quantity);
  const [unit, setUnit] = useState(navigation.state.params.inPantry ?
                                   navigation.state.params.unit :
                                   navigation.state.params.foodObject.measures[0].label);
  const [inPantry, setInPantry] = useState(navigation.state.params.inPantry);

  const foodObject = navigation.state.params.foodObject;
  const food = foodObject.food;
  const units = foodObject.measures;
  const nutrients = food.nutrients;

  const AddToFavorites = (amount, foodObj, unitType) => {
    const newFoodObj = {
      "quantity": parseInt(amount),
      "unit": unitType,
      "food": foodObj.food
    }
    AddFood(newFoodObj);
  }

  return (
    <Provider>
      <View style={{margin: 30, marginTop:50, marginBottom: 100, alignItems: 'center'}}>
        <Text style={styles.title}>{food.label}</Text>
        <Text style={styles.subTitle}>{[inPantry ? <Text>{quantity}({unit}) in Pantry</Text> : 'None in your pantry!']}</Text>
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
            if (quantity !== undefined) {
              onChangeAmount(quantity);
            }
            setVisible(true);
          }}
        >{[inPantry ? 'Update Pantry' : 'Add to Pantry']}</Button>
        {inPantry ?
          <Button
            onPress={() => {
              setVisible2(true);
            }}
          >Remove from Pantry</Button> :
          null
        }
        <Portal>
          <Dialog
            visible={visible2}
            onDismiss={() => {setVisible2(false)}}>
            <Dialog.Content>
              <View style={{alignItems: 'center'}}>
                <Text>Confirm removal?</Text>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress= {() =>{
                  RemoveFood(food.foodId);
                  setVisible2(false);
                  setInPantry(false);
                }}
              >Yes</Button>
              <Button
                onPress= {() =>{
                  // Close popup.
                  setVisible2(false);
                }}
              >Cancel</Button>
            </Dialog.Actions>
          </Dialog>
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
              <Picker
                selectedValue={unit}
                style={{height:20, width:'100%'}}
                onValueChange={(itemValue, itemIndex) => {
                  setUnit(itemValue);
                }}
              >
                {units.map((item) => {
                    return <Picker.Item label={item.label} value={item.label}/>
                })}
              </Picker>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress= {() =>{
                  // Add to pantry, close popup.
                  AddToFavorites(amountItem, foodObject, unit);
                  if (amountItem > 0) {
                    setQuantity(amountItem);
                    setUnit(unit);
                    setInPantry(true);
                  }
                  setVisible(false);
                  console.log(amountItem);
                }}
              >Submit</Button>
              <Button
                onPress= {() =>{
                  // Close popup.
                  setVisible(false);
                }}
              >Cancel</Button>
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

export default FoodDetails;
