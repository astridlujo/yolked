import React, { useReducer } from 'react';
import { FlatList, StyleSheet,SafeAreaView, Searchbar } from 'react-native';
import ListItem from '../components/ListItem';
import Search from '../components/Search';


const DATA = [
  {
    id: '1',
    item: 'First Item',
    amount: 5,
  },
  {
    id: '2',
    item: 'Second Item',
    amount: 6,
  },
  {
    id: '3',
    item: 'Third Item',
    amount: 7,
  },

];


const reducer = (state, action) => {

  
    switch (action.type) {
      case 'increment':
        return  state.map(item =>{
          console.log(item.amount);
          //item.amount + 1;
          
        })
      //case 'decrement':
       // return { ...state, amount: state.amount - action.payload };
      default:
        return state;
  }
};




const ListScreen = () => {

  const [state, dispatch] = useReducer(reducer, DATA );
  




  return (
    <SafeAreaView style={styles.container}>
      <Search/>
    <FlatList
      data = {DATA}
      renderItem={({ item }) => <ListItem id={item.id} item={item.item} amount={item.amount} onIncrease={() =>dispatch({ type: 'increment', payload: 1 })} />}
      keyExtractor={item => item.id}
    />

  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListScreen;
