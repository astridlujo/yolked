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
    const checker = navigation.addListener('didFocus', () => {
      CheckFoods();
    });
    CheckFoods();
  }, [navigation]);

  async function CheckFoods() {
    const foodArray = await GetFoods();
    dispatch({type: 'setArray', newArray: foodArray});
  }

  return (
    <Provider>
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search pantry..."
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
       <Paragraph style={styles.fontStyle} >Are you sure you want to remove this item?</Paragraph>
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
  },

  fontStyle: {
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto'
  }
});

export default PantryScreen;
