import React, { useReducer } from 'react';
import { FlatList, StyleSheet,SafeAreaView } from 'react-native';
import { Provider, Portal, Dialog, Button, Paragraph, Searchbar } from 'react-native-paper';
import FaveItem from '../components/FaveItem';
import {reducer, foodItem, initialState } from '../components/Reducer';
import {testFaveList} from '../../data/favelistdata';

  const FaveList = () => {
  
  const [state, dispatch] = useReducer(reducer, testFaveList);
  const [searchInput,onSeachChange] = React.useState('');
  //console.log(state.foodItem[0].recipe.url);

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
        data = {state.foodItem.filter(item => item.recipe.label.includes(searchInput))}
        extraData={state.update}
        renderItem={({ item }) => {return(<FaveItem item={item} 
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
  </SafeAreaView>
  </Provider>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FaveList;
