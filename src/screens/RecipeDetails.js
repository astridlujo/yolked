import React, { useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, FlatList, Picker, Image, Linking } from 'react-native';
import { Provider, Portal, Dialog, TextInput, Searchbar, Button } from 'react-native-paper';
import { AddRecipe, RemoveRecipe } from '../scripts/FirebaseFunctions';
import CustomButton from '../components/Button';

const RecipeDetails = ({navigation}) => {
  const [inFavorites, setInFavorites] = useState(navigation.state.params.inFavorites);
  const [visible, setVisible] = useState(false);
  const recipeObject = navigation.state.params.recipeObject;

  return(
    <Provider>
      <View style={{margin: 10, marginTop:10, marginBottom: 0, alignItems: 'center'}}>
        <View>
          <Text style={styles.title}>{recipeObject.recipe.label}</Text>
        </View>
        <SafeAreaView style={{height:'88%'}}>
          <Image
            style={styles.image}
            source={{uri: recipeObject.recipe.image}}
          />
          <Text style={styles.title}>Info</Text>
          <View style={styles.details}>
            <Text>Source: {recipeObject.recipe.source}</Text>
            <Text>Calories: {recipeObject.recipe.calories.toFixed(0)}</Text>
            <Button
              onPress={() => {
                setVisible(true);
              }}
            >Full Nutrition info</Button>
          </View>
          <Text style={styles.title}>Ingredients</Text>
          <FlatList
            keyExtractor={object => object}
            data={recipeObject.recipe.ingredientLines}
            renderItem={({ item }) => {
              return (
                <Text>- {item}</Text>
              )
            }}
          />
        </SafeAreaView>
        <View style={styles.options}>
          <Button
            onPress={() => {
              if (inFavorites) {
                RemoveRecipe(recipeObject.recipe.url);
                setInFavorites(false);
              } else {
                AddRecipe(recipeObject);
                setInFavorites(true);
              }
            }}
          >{inFavorites ? "Unsave Recipe" : "Save Recipe"}</Button>
          <Button
            onPress={() => {
              //console.log(recipeObject);
              Linking.openURL(recipeObject.recipe.url);
            }}
          >Source</Button>
        </View>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={() => {setVisible(false)}}
            style={{width: '95%', height: '90%', alignSelf: 'center'}}
          >
            <Dialog.ScrollArea
              style={{width: '105%', alignSelf: 'center'}}
            >
              <SafeAreaView style={styles.factBox}>
                <View style={styles.factTitle}>
                  <Text style={{fontSize: 28}}>Nutrition Facts</Text>
                </View>
                <View style={styles.factServing}>
                  <Text style={{fontSize: 18}}>Servings: {recipeObject.recipe.yield}</Text>
                </View>
                <FlatList
                  ListHeaderComponent={() => {
                    return (
                      <View style={{borderBottomColor: '#000', borderBottomWidth: 5}}>
                        <Text style={{fontSize: 15, textAlign: 'right'}}>%DV</Text>
                      </View>
                    )
                  }}
                  data={recipeObject.recipe.digest}
                  keyExtractor={nutrient => nutrient.tag}
                  renderItem={({ item }) => {
                    //console.log(itemDaily);
                    return(
                      <View style={styles.factItem}>
                        <Text style={{fontSize: 15}}>{item.label}: {item.total.toFixed(2)}
                        {item.unit}</Text>
                        <Text style={{fontSize: 15}}>
                          {item.daily.toFixed(2)}%
                        </Text>
                      </View>
                    );
                  }}
                />
              </SafeAreaView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto',
    fontSize: 22,
    textAlign: "center"
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 20,
    borderWidth:5,
    borderColor:'#BBB',
    padding: 10,
    alignSelf: 'center'
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  details: {
    flexDirection: "column",
    padding: 15,
    paddingBottom: 0,
    justifyContent: "space-around"
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#CCC',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  factBox: {
    padding: 15,
    height:'95%',
    width: '100%',
    borderWidth:3,
    borderColor: '#000'
  },
  factTitle: {
    fontSize: 30,
    borderBottomColor: '#000',
    borderBottomWidth: 5
  },
  factServing: {
    fontSize: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  factItem: {
    fontSize: 15,
    borderBottomColor: '#000',
    borderBottomWidth: 5,
    flexDirection: 'row',
    justifyContent:  'space-between'
  },
});

export default RecipeDetails
