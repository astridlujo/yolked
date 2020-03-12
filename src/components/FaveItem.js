import * as React from 'react';
import { StyleSheet,TouchableOpacity } from 'react-native';
import { Button, Card, Title, Avatar, IconButton, Colors } from 'react-native-paper';

const ListItem = ({item, onDelete}) => (
  <TouchableOpacity>
  <Card style={{flexDirection: 'row'}}>


    <Card.Actions style={{alignSelf: 'flex-start'}}>
    <Avatar.Image size={40} source={{uri: item.recipe.image }} />
    <Title style={{width:'80%'}}>  {item.recipe.label}</Title>
 
      <IconButton
    icon="cup"
    color={Colors.red500}
    size={20}
    onPress={() => onDelete()}
  />
    </Card.Actions>
  </Card>
  </TouchableOpacity>
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
