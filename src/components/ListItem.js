import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph, IconButton, Colors } from 'react-native-paper';

const ListItem = ({item, amount}) => (

  <Card style={{flexDirection: 'row'}}>


    <Card.Actions style={{alignSelf: 'flex-start'}}>
    <Title style={{width:'65%'}}>{item}</Title>
      <IconButton
    icon="minus"
    color={Colors.blue500}
    size={20}
    onPress={() => amount = amount - 1}
  />
      <Title>{amount}</Title>
      <IconButton
    icon="plus"
    color={Colors.blue500}
    size={20}
    onPress={() => console.log('Pressed')}
  />
      <IconButton
    icon="cup"
    color={Colors.red500}
    size={20}
    onPress={() => console.log('Pressed')}
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
