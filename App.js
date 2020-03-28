import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer', ['']]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

import React from 'react';
import { Platform } from 'react-native'
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import PantryScreen from './src/screens/PantryScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import FoodScreen from './src/screens/FoodScreen';
import FoodDetails from './src/screens/FoodDetails';
import RecipesScreen from './src/screens/RecipesScreen';
import RecipeDetails from './src/screens/RecipeDetails';
import SettingsScreen from './src/screens/SettingsScreen';
import FavRecipesScreen from './src/screens/FavRecipesScreen';

import Colors from './constants/Colors';

const bottomTabNavigatorConfig = {
    // The Recipes screen
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Recipes',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-home'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
    // The Search Recipes Screen
    Foods: {
        screen: createStackNavigator({
          Pantry: PantryScreen,
          Food: FoodScreen,
          FoodDetails: FoodDetails
        }, {
          title: 'Foods',
          headerShow: false
        }),
        navigationOptions: {
            tabBarLabel: 'Foods',
            tabBarIcon: (tabInfo) => {
                return (
                    <MaterialCommunityIcons
                        name='food-apple'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },

    // The pantry Screen
    Recipes: {
        screen: createStackNavigator({
          FavRecipes: FavRecipesScreen,
          Recipes: RecipesScreen,
          RecipeDetails: RecipeDetails
        }),
        navigationOptions: {
            tabBarLabel: 'Recipes',
            tabBarIcon: (tabInfo) => {
                return (
                    <MaterialCommunityIcons
                        name='food-fork-drink'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },

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
            barStyle: {
              backgroundColor: '#09A129'
            },
            shifting: true
        })
        : createBottomTabNavigator(bottomTabNavigatorConfig, {
            tabBarOptions: {
                activeTintColor: '#036D19',
                inactiveTintColor: '#036D19'
    }
});

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Login: LoginScreen,
    Signup: SignupScreen
  }),
  mainFlow: appTabNavigator
})

export default createAppContainer(switchNavigator);
