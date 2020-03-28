import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const Star = ({popup}) => (
  <FAB
    style={styles.fab}
    color='#FFDF00'
    small
    icon="star"
  />
);

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#FDB515',
    position: 'absolute',
    margin: 0,
    right: '-50%',
    bottom: 80,
  },
})

export default Star;
