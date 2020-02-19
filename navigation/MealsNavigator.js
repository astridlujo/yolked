// A screen navigator
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Import screens
import CategoriesScreen from '../src/screens/CategoriesScreen';
import CategoryMealsScreen from '../src/screens/CategoryMealsScreen';
import MealDetailScreen from '../src/screens/MealDetailScreen'

import Colors from '../constants/Colors';

const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen
        },
        CategoryMeals: {
            screen: CategoryMealsScreen
        },
        MealDetail: {
            screen: MealDetailScreen
        },
    },

    {
        // Set a default start screen
        // initialRouteName: 'NameOfScreen'
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.headerColor
            }
        }
    }
);

export default createAppContainer(MealsNavigator);