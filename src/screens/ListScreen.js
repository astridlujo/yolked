import React from 'react';
import { FlatList, StyleSheet,SafeAreaView, Searchbar } from 'react-native';
import ListItem from '../modules/ListItem';
import Search from '../modules/Search';

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
const ListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Search/>
    <FlatList
      data={DATA}
      renderItem={({ item }) => <ListItem item={item.item} amount={item.amount} />}
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
