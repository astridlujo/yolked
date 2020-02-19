// Select a food category screen
import React from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, Button } from 'react-native';

import { CATEGORIES, MEALS } from '../../data/dummy-data';
import MealItem from '../components/MealItem';

const CategoryMealsScreen = props => {

    const renderMealItem = itemData => {
        return (
            <MealItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                onSelectMeal={() => {
                    // props.navigation.navigate({route: 'MealDetail', params: {
                    //     mealI
                    // }})
                }}
            />
        )
    }

    // It takes the parameter we want to pass
    const catID = props.navigation.getParam('categoryID');

    const displayMeals = MEALS.filter(
        meal => meal.categoryIDs.indexOf(catID) >= 0);

    // const selectedCategory = CATEGORIES.find(categories => categories.id === catID);

    return (

        <View style={styles.screen}>
            <FlatList 
                data={displayMeals}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                numColumns={2}
            />
        </View>
    );
};

// Change the screen header Dinamically

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catID = navigationData.navigation.getParam('categoryID');

    const selectedCategory = CATEGORIES.find(categories => categories.id === catID);

    return{
        headerTitle: selectedCategory.title
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default CategoryMealsScreen;


// OLD DATA JUST FOR REFERENCE

// return (
//     <View style={styles.screen}>
//         <Text>The category meal screen</Text>
//         <Text>{selectedCategory.title}</Text>
//         <Button title="Go to Details Screen" onPress={() => {
//             props.navigation.navigate({
//                 routeName: 'MealDetail'
//             })
//         }} />
//         <Button title='Go back to Categories' onPress={() => {
//             props.navigation.popToTop();
//         }}/>

//     </View>
// );