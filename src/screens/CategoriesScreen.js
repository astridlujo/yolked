// Select a food category screen
import React, { useState, useReducer }  from 'react';
import { View, StyleSheet, FlatList, TextInput, Button } from 'react-native';

import { CATEGORIES } from '../../data/dummy-data';
import CategoryGridTile from '../../components/CategoryGridTile';

// Edamam Pull import
import { SearchRecipe } from '../scripts/EdamamPull';

const CategoriesScreen = props => {

    const [searchText, setSearchText] = useState('');
    const [result, setResult] = useState([]);

    const searchFor = async (recipeName) => {
        setResult([]);
        setResult(await SearchRecipe(recipeName));
    }

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                //title={itemDaga['recipe']['label']} 
                title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({routeName: 'CategoryMeals', params: {
                        categoryID: itemData.item.id
                    }});
                }}
            />
        );
    }

    return (

        <View>
            <View style={{ margin: 50 }}>
                <TextInput 
                    placeholder='Search for a recipe'
                    onChangeText={text =>setSearchText(text)}
                    value={searchText}
                />

                <Button 
                    title='Search'
                    onPress={() => {
                    searchFor(searchText)
                    }}
                />

                <FlatList
                keyExtractor={recipe => food['recipe']['recipeId']}
                data={result}
                renderItem={({ item }) => {
                if (result.length === 0) {
                return;
                } else {
                    return (
                    <TouchableOpacity style={styles.itemTouch}>
                        <Text>{item['recipe']['label']}</Text>
                    </TouchableOpacity>
            )
          }
        }}
      />
            </View>

            <FlatList 
                keyExtractor={(item, index) => item.id} 
                data={CATEGORIES} 
                renderItem={renderGridItem} 
                numColumns={2}
            />

        </View>
        
    );
};

// Change the Header title and Style
CategoriesScreen.navigationOptions = {
    headerTitle: 'All Recipes'
    // Change the color of the Text
    // headerTintColor: 'white';
}

// STYLES

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default CategoriesScreen;

// OLDSTUFF
        // <View style={styles.screen}>
        //     <Text>The categories screen</Text>
        //     <Button title="Go to Meals!" onPress={() => {
        //         props.navigation.navigate({routeName: 'CategoryMeals'})
        //     }} />
           
        // </View>