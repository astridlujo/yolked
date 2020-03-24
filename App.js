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
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './src/screens/HomeScreen';
import PantryScreen from './src/screens/PantryScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import FoodScreen from './src/screens/FoodScreen';
import FoodDetails from './src/screens/FoodDetails';
import RecipesScreen from './src/screens/RecipesScreen';
import RecipeDetails from './src/screens/RecipeDetails';
import SettingsScreen from './src/screens/SettingsScreen';

import Firebase from './constants/FirebaseKeys';

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
      Login: LoginScreen,
      Signup: SignupScreen,
    }),
  mainFlow: createBottomTabNavigator({
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          title: 'Home',
        }
      },
      Foods: createStackNavigator({
        //Pantry: PantryScreen,
        Food: FoodScreen,
        FoodDetails: FoodDetails
      }, {
        defaultNavigationOptions: {
          title: 'Foods',
          headerShown: true,
        }
      }),
      Recipes: createStackNavigator({
        //FavRecipes: FavRecipesScreen
        Recipes: RecipesScreen,
        RecipeDetails: RecipeDetails
      }, {
        defaultNavigationOptions: {
          title: 'Recipes',
          headerShown: true,
        }
      }),
      Settings: {
        screen: SettingsScreen,
        navigationOptions: {
          title: 'Settings',
        }
      }
    })
});

export default createAppContainer(switchNavigator);
