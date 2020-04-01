import React, { useReducer, useEffect } from 'react';
import { FlatList, StyleSheet,SafeAreaView } from 'react-native';
import { Provider, Portal, Dialog, Button, Paragraph, Searchbar } from 'react-native-paper';
import { GetRecipes } from '../scripts/FirebaseFunctions';
import FaveItem from '../components/FaveItem';
import Fab from '../components/fab';
import {reducer, initialState } from '../components/RecipeReducer';

  const FavRecipesScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchInput,onSeachChange] = React.useState('');

  useEffect(() => {
    console.log("Getting Favorites");
    const checker = navigation.addListener('didFocus', () => {
      CheckRecipes();
    });
    CheckRecipes();
  }, [navigation]);

  async function CheckRecipes() {
    const recipeArray = await GetRecipes();
    console.log(state);
    dispatch({type: 'setArray', newArray: recipeArray});
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
        keyExtractor={item => item.recipe.url}
        data = {state.recipeItems.filter(item => item.recipe.label.includes(searchInput))}
        extraData={state.update}
        renderItem={({ item }) => {return(<FaveItem
                                          navigation={navigation}
                                          item={item}
                                          onDelete= {() =>{ dispatch({type: 'popup', key: item.recipe.url})}} />)}}
    />

    <Portal>
          <Dialog
            visible={state.visible}
            onDismiss={ () =>{dispatch({type: 'closepopup'})}}>
          <Dialog.Content>
           <Paragraph style={styles.fontStyle}>Are you sure you want to remove this item?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress= { () =>{dispatch({type: 'delete'})}} >Delete</Button>
            <Button onPress= { () =>{dispatch({type: 'closepopup'})}} >Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
        <Fab  popup = {() => navigation.navigate('Recipes')} />
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

export default FavRecipesScreen;
