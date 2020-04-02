import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, Title, Avatar, IconButton, Colors } from 'react-native-paper';
// <Avatar.Image size={40} source={{uri:'https://www.edamam.com/food-img/6bc/6bcf87ba7f4f162b0d257d041d69af34.jpg'}} />
const ListItem = ({navigation, item, onIncrease, onDecrease, onDelete}) => (

  <Card style={{flexDirection: 'row', borderTopWidth: 10, borderColor: '#CCC'}}>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('FoodDetails', { foodObject: item.foodData,
          inPantry: true, quantity: item.quantity, unit: item.unit })
      }}
    >
      <Title style={{maxWidth:'100%', padding: '2%', textAlign: 'left'}}>  {item.foodData.food.label}</Title>
    </TouchableOpacity>
    <Card.Actions style={{justifyContent: 'space-between'} }>
    <TouchableOpacity>
      <Avatar.Image size={40} source={{uri:item.foodData.food.image}} />
    </TouchableOpacity>
      <IconButton
    icon="minus"
    color={Colors.blue500}
    size={20}
    onPress={() => onDecrease()}
  />
      <Title>{item.quantity} {item.unit}{item.quantity > 1 ? 's' : ''}</Title>
      <IconButton
    icon="plus"
    color={Colors.blue500}
    size={20}
    onPress={() =>onIncrease()}
  />
      <IconButton
    icon="cup"
    color={Colors.red500}
    size={20}
    onPress={() => onDelete()}
  />
    </Card.Actions>
  </Card>

);

const styles = StyleSheet.create({
  Button: {
    margin: 0,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    elevation: 9,
    padding: 4,
  },

})

export default ListItem;
