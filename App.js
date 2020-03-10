import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import TestScreen from './src/screens/TestScreen'; // Mark for removal....
import FoodScreen from './src/screens/FoodScreen';
import FoodDetails from './src/screens/FoodDetails';
import RecipesScreen from './src/screens/RecipesScreen';
import RecipeDetails from './src/screens/RecipeDetails';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    List: ListScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
    Test: TestScreen,
    Food: FoodScreen,
    FoodDetails: FoodDetails,
    Recipes: RecipesScreen,
    RecipeDetails: RecipeDetails
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Yolked',
      headerShown: false
    }
  }
);

export default createAppContainer(navigator);
