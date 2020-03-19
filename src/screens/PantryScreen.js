import React, { useReducer } from 'react';
import { FlatList, StyleSheet,SafeAreaView } from 'react-native';
import { Provider, Portal, Dialog, Button, TextInput,Searchbar } from 'react-native-paper';
import ListItem from '../components/ListItem';
import Fab from '../components/fab';
import {reducer, foodItem, initialState } from '../components/Reducer';

  

  const ListScreen = () => {
    
  const [state, dispatch] = useReducer(reducer, initialState);

  const [valueItem, onChangeitem] = React.useState('');
  const [amountItem, onChangeAmount] = React.useState('');
  const [searchInput,onSeachChange] = React.useState('');
  return (
    <Provider>
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={text => onSeachChange(text)}
        value={searchInput}
      />
      <FlatList
        keyExtractor={item => item.key}
        data = {state.foodItem.filter(item => item.item.includes(searchInput))}
        extraData={state.update}
        renderItem={({ item }) => {return(<ListItem item={item} 
                                          onIncrease = { () =>{dispatch({type: 'onIncrease' , key: item.key})}} 
                                          onDecrease= {() =>{dispatch({type: 'onDecrease', key: item.key})}} 
                                          onDelete= {() =>{ dispatch({type: 'onDelete', key: item.key})}} />)}}
      
    />
    <Portal>
      <Dialog
      visible={state.visible}
      onDismiss={ () =>{dispatch({type: 'closepopup'})}}>
      <Dialog.Content>
        <TextInput
          label='New Item'
          value={valueItem}
          onChangeText={text => onChangeitem(text)}
        />
        <TextInput
          label='Amount'
          value={amountItem}
          onChangeText={text => onChangeAmount(parseInt(text))}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress= { () =>{dispatch({type: 'closepopup',newAmount: amountItem, newItem: valueItem})}} >Done</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
      
    <Fab  popup = {() => {dispatch({type: 'popup'})}} />

  </SafeAreaView>
  </Provider>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListScreen;
