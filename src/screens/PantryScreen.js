import React, { useReducer, useEffect } from 'react';
import { FlatList, StyleSheet,SafeAreaView } from 'react-native';
import { Provider, Portal, Dialog, Button, Paragraph,Searchbar } from 'react-native-paper';
import { GetFoods } from '../scripts/FirebaseFunctions';
import ListItem from '../components/ListItem';
import Fab from '../components/fab';
import { reducer, initialState } from '../components/FoodReducer';

const PantryScreen = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchInput,onSeachChange] = React.useState('');

  useEffect(() => {
    console.log("Getting Favorites");
    const checker = navigation.addListener('didFocus', () => {
      CheckFoods();
    });
    CheckFoods();
  }, [navigation]);

  async function CheckFoods() {
    const foodArray = await GetFoods();
    console.log(state);
    dispatch({type: 'setArray', newArray: foodArray});
  }

  return (
    <Provider>
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={text => onSeachChange(text)}
        value={searchInput}
      />
      <FlatList
        keyExtractor={item => item.foodData.food.foodId}
        data = {state.foodItems.filter(item => item.foodData.food.label.includes(searchInput))}
        extraData={state.update}
        renderItem={({ item }) => {return(<ListItem
                                          navigation={navigation}
                                          item={item}
                                          onIncrease = {() =>{dispatch({type: 'onIncrease' , key: item.foodData.food.foodId})}}
                                          onDecrease= {() =>{dispatch({type: 'onDecrease', key: item.foodData.food.foodId})}}
                                          onDelete= {() =>{ dispatch({type: 'popup', key: item.foodData.food.foodId})}} />)}}
    />

    <Portal>
      <Dialog
        visible={state.visible}
        onDismiss={ () =>{dispatch({type: 'closepopup'})}}>
      <Dialog.Content>
       <Paragraph>Are you sure you want to remove this item?</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress= { () =>{dispatch({type: 'delete'})}} >Delete</Button>
        <Button onPress= { () =>{dispatch({type: 'closepopup'})}} >Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>

    <Fab  popup = {() => navigation.navigate('Food')} />

  </SafeAreaView>
  </Provider>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B4570',
  },
});

export default PantryScreen;
