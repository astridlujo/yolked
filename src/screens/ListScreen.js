import React, { useReducer } from 'react';
import { FlatList, StyleSheet,SafeAreaView } from 'react-native';
import { Provider, Portal, Dialog, Button, Paragraph,Searchbar } from 'react-native-paper';
import ListItem from '../components/ListItem';
import Fab from '../components/fab';
import {reducer, foodItem, initialState } from '../components/Reducer';

  

  const ListScreen = () => {
    
  const [state, dispatch] = useReducer(reducer, initialState);
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
                                          onDelete= {() =>{ dispatch({type: 'popup', key: item.key})}} />)}}
      
    />

    <Portal>
      <Dialog
      visible={state.visible}
      onDismiss={ () =>{dispatch({type: 'closepopup'})}}>
      <Dialog.Content>
       <Paragraph>Are you sure you want to DELETE</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress= { () =>{dispatch({type: 'closepopup'})}} >DELETE</Button>
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
