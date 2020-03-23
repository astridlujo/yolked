import { AsyncStorage } from 'react-native';

export async function storeData (key='', value='') {
  try {
    AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
    console.log(error);
  }
}

export async function getData (key='') {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log('Value: ' + value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};
