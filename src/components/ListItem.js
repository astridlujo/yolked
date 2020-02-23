import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph, IconButton, Colors } from 'react-native-paper';

const ListItem = ({item, onIncrease, onDecrease, onDelete}) => (

  <Card style={{flexDirection: 'row'}}>


    <Card.Actions style={{alignSelf: 'flex-start'}}>
    <Title style={{width:'65%'}}>{item.item}</Title>
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
    elevation: 4,
    padding: 8,
  },

})

export default ListItem;
