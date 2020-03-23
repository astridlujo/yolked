import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Picker, SafeAreaView } from 'react-native';
import { Provider, Portal, Dialog, TextInput, Searchbar, Button } from 'react-native-paper';
import { NutrientMap } from '../../constants/Nutrients';
import { AddFood, RemoveFood } from '../scripts/FirebaseFunctions';
import { GetNutrients } from '../scripts/EdamamPull';

const FoodDetails = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [amountItem, onChangeAmount] = useState('');
  const [searchInput, onSeachChange] = useState('');
  const [quantity, setQuantity] = useState(navigation.state.params.quantity);
  const [unit, setUnit] = useState(navigation.state.params.inPantry ?
                                   navigation.state.params.unit :
                                   navigation.state.params.foodObject.measures[0].label);
 const [nutrientUnit, setNutrientUnit] = useState(navigation.state.params.inPantry ?
                                  navigation.state.params.unit :
                                  navigation.state.params.foodObject.measures[0].label);
  const [inPantry, setInPantry] = useState(navigation.state.params.inPantry);
  const [fullNutrients, setFullNutrients] = useState([]);
  const [dailyNutrients, setDailyNutrients] = useState([]);

  const foodObject = navigation.state.params.foodObject;
  const food = foodObject.food;
  const units = foodObject.measures;
  const nutrients = food.nutrients;
  console.log(nutrients);

  function AddToFavorites(amount, foodObj, unitType) {
    const newFoodObj = {
      "quantity": parseInt(amount),
      "unit": unitType,
      "food": foodObj.food
    }
    AddFood(newFoodObj);
  }

  async function DisplayNutrients(unitType) {
    const uri = units.find(element => element.label === unitType);
    const requestData = {
      ingredients: [
        {
          quantity: 1,
          measureURI: uri,
          foodId: foodObject.food.foodId
        }
      ]
    }
    console.log(requestData);
    const [newDaily, newFull] = await GetNutrients(requestData);
    console.log(newFull);
    const fullData = Object.keys(newFull).map(key => ({
      key,
      ...newFull[key]
    }));
    const dailyData = Object.keys(newDaily).map(key => ({
      key,
      ...newDaily[key]
    }));
    setFullNutrients(fullData);
    setDailyNutrients(dailyData);
  }

  return (
    <Provider>
      <View style={{margin: 30, marginTop:50, marginBottom: 100, alignItems: 'center'}}>
        <Text style={styles.title}>{food.label}</Text>
        <Text style={styles.subTitle}>{[inPantry ? <Text>{quantity}({unit}) in Pantry</Text> : 'None in your pantry!']}</Text>
        <Text style={styles.subTitle}>Basic Nutrients</Text>
        <FlatList
          keyExtractor={nutrient => nutrient.nutrient}
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
            setVisible3(true);
            DisplayNutrients(nutrientUnit);
          }}
        >Full Nutrients</Button>
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
            visible={visible3}
            onDismiss={() => {setVisible3(false)}}>
            <Dialog.ScrollArea>
              <SafeAreaView style={styles.factBox}>
              <View style={styles.factTitle}>
                <Text style={{fontSize: 28}}>Nutrition Facts</Text>
              </View>
              <View style={styles.factServing}>
                <Text style={{fontSize: 18}}>Serving Size 1</Text><Picker
                  selectedValue={nutrientUnit}
                  itemStyle={{ fontSize: 18}}
                  style={{height:25, width:'50%', fontSize: 20,
                  backgroundColor: '#FAED27'}}
                  onValueChange={async (itemValue, itemIndex) => {
                    setNutrientUnit(itemValue);
                    DisplayNutrients(itemValue);
                  }}
                >
                  {units.map((item) => {
                      return <Picker.Item label={`${item.label}`} value={item.label}/>
                  })}
                </Picker><Text style={{fontSize: 18}}>↓</Text>
              </View>
              <FlatList
                extraData={fullNutrients}
                data={fullNutrients}
                renderItem={({ item }) => {
                  return(
                    <View style={styles.factItem}>
                      <Text style={{fontSize: 15}}>{item.label}: {item.quantity.toFixed(2)}
                      {item.unit}</Text>
                    </View>
                  );
                }}
              />
              </SafeAreaView>
            </Dialog.ScrollArea>
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
  },
  factBox: {
    padding: 15,
    width: '100%',
    borderWidth:3,
    borderColor: '#000'
  },
  factTitle: {
    fontSize: 30,
    borderBottomColor: '#000',
    borderBottomWidth: 5
  },
  factServing: {
    fontSize: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  factItem: {
    fontSize: 15,
    borderBottomColor: '#000',
    borderBottomWidth: 5,
    flexDirection: 'row'
  },
});

export default FoodDetails;
