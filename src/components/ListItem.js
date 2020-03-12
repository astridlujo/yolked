import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Title, Avatar, IconButton, Colors } from 'react-native-paper';

const ListItem = ({item, onIncrease, onDecrease, onDelete}) => (

  <Card style={{flexDirection: 'row'}}>


    <Card.Actions style={{alignSelf: 'flex-start'}}>
    <Avatar.Image size={40} source={{uri:'https://www.edamam.com/food-img/6bc/6bcf87ba7f4f162b0d257d041d69af34.jpg'}} />
    <Title style={{width:'55%'}}>  {item.item}</Title>
      <IconButton
    icon="minus"
    color={Colors.blue500}
    size={20}
    onPress={() => onDecrease()}
  />
      <Title>{item.amount}</Title>
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
