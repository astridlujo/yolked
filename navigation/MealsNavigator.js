// A screen navigator
import React from 'react';
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons, Foundation } from '@expo/vector-icons';

// Import screens
import CategoriesScreen from '../src/screens/CategoriesScreen';
import CategoryMealsScreen from '../src/screens/CategoryMealsScreen';
import MealDetailScreen from '../src/screens/MealDetailScreen'
import HomeScreen from '../src/screens/HomeScreen';
import SettingsScreen from '../src/screens/SettingsScreen';

import Colors from '../constants/Colors';
import SearchRecipeScreen from '../src/screens/SearchRecipeScreen';
import FavoriteScreen from '../src/screens/FavoriteScreen'
import ListScreen from '../src/screens/ListScreen'


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
        HomeScreen: {
            screen: HomeScreen
        }
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

const bottomTabNavigatorConfig = {
    // The Recipes screen
    RecipesScreen: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarLabel: 'Recipes',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name='ios-restaurant' 
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
        
    // The Search Recipes Screen
    RecipesSearchScreen: {
        screen: SearchRecipeScreen,
        navigationOptions: {
            tabBarLabel: 'Search Recipes',
            tabBarIcon: (tabInfo) => {
                return (
                    <Foundation
                        name='page-search'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
    
    // The pantry Screen
    PantryScreen: {
        screen: ListScreen,
        navigationOptions: {
            tabBarLabel: 'Pantry',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name='ios-search'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
    
    // The Favorite Items Screen
    FavoritesScreen: {
        screen: FavoriteScreen,
        navigationOptions: {
            tabBarLabel: 'Favorites',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name='ios-star'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },

    // The Settings Screen
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name='ios-settings'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                )
            }
        }
    }
}


const appTabNavigator = 
    Platform.OS === 'android' 
        ? createMaterialBottomTabNavigator(bottomTabNavigatorConfig, {
            activeColor: Colors.accentColor,
            shifting: true
        }) 
        : createBottomTabNavigator(bottomTabNavigatorConfig, {
            tabBarOptions: {
                activeTintColor: Colors.headerButtonColor
    }
});

export default createAppContainer(appTabNavigator);